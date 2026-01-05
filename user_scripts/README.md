# User Scripts Folder

This folder contains user scripts that enhance the functionality of the Quartz v4 digital garden via Obsidian workspace.

## Available Scripts

### publish_quartz.js

This script automates the process of publishing your notes to your Quartz v4 digital garden. My problem was like:

> "I don't want to manually copy and paste all my markdown files to the Quartz `content` folder every time I make changes. Is there a way to automate this process?"

The `publish_quartz.js` script solves this problem by:

1. Copying all markdown files from your Obsidian vault (hardcoded path in config) to the Quartz `content` folder.
2. Pushing the changes to your Quartz GitHub repository.

After the `git push` command, you can set up GitHub Actions in your Quartz repository to automatically build and deploy your site whenever changes are pushed. Sounds good, but you still need to trigger the script manually (I do it via `Templater` plugin). But I am satisfied with this level of automation for now.
