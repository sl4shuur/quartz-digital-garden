module.exports = async () => {
  // === CONFIG ===
  const QUARTZ_REPO = "C:\\_GitHub\\quartz";
  const CONTENT_DST = `${QUARTZ_REPO}\\content`;
  const ASSETS_DST = `${CONTENT_DST}\\assets`;
  const USER_SCRIPTS_DST = `${QUARTZ_REPO}\\user_scripts`;
  
  const dateStr = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  
  // Path rewrite rules: source pattern → destination pattern
  const PATH_REWRITES = [
    // Remove intermediate folders like "1_2-term", "2_5-term", etc.
    { from: /02 - KSE\/\d+_\d+-term\//, to: "KSE/" },
    
    // Rename DG Home to index.md
    { from: "DG Home.md", to: "index.md" },
    
    // Add more rules here:
    // { from: /pattern/, to: "replacement" },
    // { from: "exact/path/", to: "new/path/" },
  ];
  
  // Media extensions to copy
  const MEDIA_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".mp4", ".webm", ".mov"];
  // ==============

  const vaultRoot = app.vault.adapter.basePath;
  const fs = require("fs");
  const path = require("path");
  const { exec } = require("child_process");
  const { promisify } = require("util");
  const execAsync = promisify(exec);

  // Helper: run git command
  const runGit = async (cmd) => {
    try {
      const { stdout, stderr } = await execAsync(cmd, { cwd: QUARTZ_REPO });
      return { stdout: stdout.trim(), stderr: stderr.trim(), success: true };
    } catch (error) {
      return { stdout: "", stderr: error.message, success: false };
    }
  };

  // Helper: apply path rewrites
  const rewritePath = (originalPath) => {
    let newPath = originalPath;
    for (const rule of PATH_REWRITES) {
      if (rule.from instanceof RegExp) {
        newPath = newPath.replace(rule.from, rule.to);
      } else {
        newPath = newPath.split(rule.from).join(rule.to);
      }
    }
    return newPath;
  };

  // Helper: check if file is media
  const isMediaFile = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return MEDIA_EXTENSIONS.includes(ext);
  };

  // Helper: extract media links from markdown content
  const extractMediaLinks = (content) => {
    const mediaLinks = new Set();
    
    // Match [[wiki-links]] and ![[embeds]]
    const wikiLinkRegex = /!?\[\[([^\]]+?)\]\]/g;
    let match;
    while ((match = wikiLinkRegex.exec(content)) !== null) {
      const link = match[1].split("|")[0].split("#")[0].trim();
      if (isMediaFile(link)) {
        mediaLinks.add(link);
      }
    }
    
    // Match markdown images ![](path)
    const mdImageRegex = /!\[.*?\]\(([^)]+)\)/g;
    while ((match = mdImageRegex.exec(content)) !== null) {
      const link = match[1].trim();
      if (isMediaFile(link)) {
        mediaLinks.add(link);
      }
    }
    
    return Array.from(mediaLinks);
  };

  // 0) Collect files with dg-publish:true
  const files = app.vault.getMarkdownFiles();
  const publishList = [];
  const mediaFiles = new Set();
  
  for (const f of files) {
    const cache = app.metadataCache.getFileCache(f);
    const fm = cache?.frontmatter || {};
    if (fm["dg-publish"] === true) {
      publishList.push(f);
      
      // Extract media links from the file
      const content = await app.vault.read(f);
      const media = extractMediaLinks(content);
      media.forEach(m => mediaFiles.add(m));
    }
  }

  // 1) Clear content/
  if (fs.existsSync(CONTENT_DST)) {
    fs.rmSync(CONTENT_DST, { recursive: true, force: true });
  }
  fs.mkdirSync(CONTENT_DST, { recursive: true });
  fs.mkdirSync(ASSETS_DST, { recursive: true });

  // 2) Copy markdown files with path rewriting
  let copied = 0;
  for (const f of publishList) {
    const absSrc = path.join(vaultRoot, f.path);
    const rewrittenPath = rewritePath(f.path);
    const absDst = path.join(CONTENT_DST, rewrittenPath);
    
    fs.mkdirSync(path.dirname(absDst), { recursive: true });
    fs.copyFileSync(absSrc, absDst);
    copied++;
  }

  // 3) Copy media files to content/assets/
  let mediaCopied = 0;
  for (const mediaName of mediaFiles) {
    // Try to find the file in vault
    const allFiles = app.vault.getFiles();
    const mediaFile = allFiles.find(f => f.name === mediaName || f.path.endsWith(mediaName));
    
    if (mediaFile) {
      const absSrc = path.join(vaultRoot, mediaFile.path);
      const absDst = path.join(ASSETS_DST, mediaFile.name);
      
      if (fs.existsSync(absSrc)) {
        fs.copyFileSync(absSrc, absDst);
        mediaCopied++;
      }
    }
  }

  // 4) Check if script needs update
  if (!fs.existsSync(USER_SCRIPTS_DST)) {
    fs.mkdirSync(USER_SCRIPTS_DST, { recursive: true });
  }
  
  const thisScriptSrc = path.join(vaultRoot, "assets", "scripts", "publish_quartz.js");
  const thisScriptDst = path.join(USER_SCRIPTS_DST, "publish_quartz.js");
  
  let scriptChanged = false;
  if (!fs.existsSync(thisScriptDst)) {
    scriptChanged = true;
  } else {
    const srcContent = fs.readFileSync(thisScriptSrc, "utf8");
    const dstContent = fs.readFileSync(thisScriptDst, "utf8");
    scriptChanged = srcContent !== dstContent;
  }
  
  if (scriptChanged) {
    fs.copyFileSync(thisScriptSrc, thisScriptDst);
  }

  // 5) Git operations: separate commits for content and script
  await runGit("git add content");
  
  // Check if content has changes
  const contentDiff = await runGit("git diff --cached --quiet content");
  const hasContentChanges = !contentDiff.success;
  
  if (hasContentChanges) {
    const contentMsg = `Update notes: ${copied} files, ${mediaCopied} media (${dateStr})`;
    await runGit(`git commit -m "${contentMsg}"`);
  }
  
  // Commit script changes separately
  if (scriptChanged) {
    await runGit("git add user_scripts");
    const scriptMsg = `Update publish script (${dateStr})`;
    await runGit(`git commit -m "${scriptMsg}"`);
  }
  
  // Push if there were any commits
  if (hasContentChanges || scriptChanged) {
    await runGit("git push");
  }

  new Notice(
    `Quartz publish: ${copied} notes, ${mediaCopied} media → content/\n` +
    `${hasContentChanges ? "✅ Content committed" : "⏭️ No content changes"}\n` +
    `${scriptChanged ? "✅ Script updated" : "⏭️ Script unchanged"}`
  );
  
  return { copied, mediaCopied, contentCommitted: hasContentChanges, scriptUpdated: scriptChanged };
};