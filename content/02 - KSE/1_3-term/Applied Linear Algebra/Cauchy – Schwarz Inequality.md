---
date: 2025-02-17
tags:
  - kse
  - math/linal
cssclasses:
  - centered-title
dg-publish: true
---

# Cauchy – Schwarz Inequality

---

For all real vectors (?) $\mathbf{x}$ and $\mathbf{y}$, the **Cauchy – Schwarz inequality** states:

$$
| \mathbf{x} \cdot \mathbf{y} | \leq \|\mathbf{x}\| \|\mathbf{y}\|
$$

This inequality is equivalent to the **triangle inequality** for a norm in a space with a scalar product...

Before we dive into proving the Cauchy – Schwarz inequality, let’s clear up an important distinction between absolute value and norm  —  two concepts that often look similar but are different in meaning.

---

## What’s the Difference Between $|x|$ and $\|x\|$?

- $|x|$ (**Absolute value**):  
  Measures the distance of a number from zero on the real number line.
- If $x$ is a single number (a scalar):
  $$
  |x| = \begin{cases}
  x, & \text{if } x \geq 0 \\[10pt]
  -x, & \text{if } x < 0
  \end{cases}
  $$
  
<strong><span style="color: var(--color-green);">Example</span></strong>: $|5| = 5$, $|-5| = 5$.

---

- $\|\mathbf{x}\|$ (**Norm**):  
  Measures the length (magnitude) of a vector in space. For a vector $\mathbf{x} = (x_1, x_2, \dots, x_n)$, the most common norm is the **Euclidean norm**:
  $$
  \|\mathbf{x}\| = \sqrt{x_1^2 + x_2^2 + \dots + x_n^2}
  $$
  
<strong><span style="color: var(--color-green);">Example</span></strong>: For $\mathbf{x} = (3,4)$,
$$
\|\mathbf{x}\| = \sqrt{3^2 + 4^2} = 5
$$

---

**Key Difference**

- $|x|$ measures the length of a single number on a line. It's just a **modulus**.
- $\|\mathbf{x}\|$ measures the length of a vector in multi-dimensional space. Norms could be **different**, but the *Euclidean norm* is the most common.

---

## Cauchy – Schwarz Inequality: The Statement

The Cauchy – Schwarz inequality says:

$$
| \mathbf{x} \cdot \mathbf{y} | \leq \|\mathbf{x}\| \|\mathbf{y}\|
$$

Where:

- $\mathbf{x} \cdot \mathbf{y}$ is the dot product of vectors $\mathbf{x}$ and $\mathbf{y}$, defined as:
  $$
  \mathbf{x} \cdot \mathbf{y} = x_1y_1 + x_2y_2 + \dots + x_ny_n
  $$
  OR
  $$
  \mathbf{x} \cdot \mathbf{y} = \|\mathbf{x}\| \|\mathbf{y}\| \cos(\theta)
  $$
  where $\theta$ is the angle between the vectors.
- $|\mathbf{x} \cdot \mathbf{y}|$ is the absolute value of the dot product (just a scalar).
- $\|\mathbf{x}\|$ and $\|\mathbf{y}\|$ are the magnitudes (lengths) of the vectors.

So, basically, looking at the **dot product formula** with $\cos(\theta)$, the Cauchy – Schwarz inequality tells us that the dot product is always **bounded by the lengths** of the vectors.
$cos(\theta)$ can never exceed 1, so the dot product can never exceed the product of the lengths.

---

## What Does It Mean?

> [!Quote] Cauchy – Schwarz inequality tells us:
> The dot product between two vectors is always smaller than or equal to the product of their lengths.

It’s like comparing the "*shadow*" of one vector on another to their total lengths. The dot product measures the alignment between vectors:

- If the vectors are in the same direction, the dot product is at its <strong><span style="color: var(--color-red);">maximum</span></strong>.
- If they are at right angles (90°), the dot product is <strong><span style="color: var(--color-cyan);">zero</span></strong>.
- If they point in opposite directions, the dot product is <strong><span style="color: var(--color-orange);">negative</span></strong> but still within the bound.

---

## Proof of the Cauchy – Schwarz Inequality

Let’s prove it step by step using a clever trick with quadratic equations:

### Step 1: Start with a General Vector Expression

For any real vectors $\mathbf{x}$ and $\mathbf{y}$, define:

$$
f(\lambda) = \|\mathbf{x} - \lambda \mathbf{y}\|^2
$$

> [!Remark] Remark
> $f(\lambda)$ is a function of a real parameter $\lambda$ that returns the norm of the difference between $\mathbf{x}$ and $\lambda \mathbf{y}$.
> In other words, it’s the **squared distance** between the vectors.

![[Squared Vector Distances.svg|400]]

Since norms are always **non-negative**, we know:

$$
f(\lambda) \geq 0 \quad \text{for all real } \lambda
$$

---

### Step 2: Expand the Norm

Using the definition of the dot product and norm:

So, basically:

$$
\|\mathbf{x}\|^2 = (\sqrt{x_1^2 + x_2^2 + \dots + x_n^2})^2 = x_1^2 + x_2^2 + \dots + x_n^2 = \mathbf{x} \cdot \mathbf{x}
$$

Similarly, we can say:

$$
f(\lambda) = (\mathbf{x} - \lambda \mathbf{y}) \cdot (\mathbf{x} - \lambda \mathbf{y})
$$

Expand the dot product:

$$
f(\lambda) = \mathbf{x} \cdot \mathbf{x} - 2\lambda(\mathbf{x} \cdot \mathbf{y}) + \lambda^2(\mathbf{y} \cdot \mathbf{y})
$$

---

### Step 3: Rewrite in a Quadratic Form

Let’s set it up as a quadratic expression in terms of $\lambda$:

$$
f(\lambda) = \|\mathbf{x}\|^2 - 2\lambda(\mathbf{x} \cdot \mathbf{y}) + \lambda^2 \|\mathbf{y}\|^2
$$

---

### Step 4: Analyze the Quadratic Inequality

Since $f(\lambda) \geq 0$ for all $\lambda$, the quadratic equation:

$$
\lambda^2 \|\mathbf{y}\|^2 - 2\lambda(\mathbf{x} \cdot \mathbf{y}) + \|\mathbf{x}\|^2 \geq 0
$$

must have no real roots or a non-positive discriminant. The discriminant ($\Delta$) for a quadratic $a\lambda^2 + b\lambda + c$ is:

$$
\Delta = b^2 - 4ac
$$

Here:

- $a = \|\mathbf{y}\|^2$
- $b = -2(\mathbf{x} \cdot \mathbf{y})$
- $c = \|\mathbf{x}\|^2$

---

### Step 5: Set the Discriminant Condition

Since $f(\lambda) \geq 0$, the discriminant must be less than or equal to zero:

$$
\Delta = (-2(\mathbf{x} \cdot \mathbf{y}))^2 - 4(\|\mathbf{y}\|^2)(\|\mathbf{x}\|^2) \leq 0
$$

---

### Step 6: Simplify the Discriminant

$$
4(\mathbf{x} \cdot \mathbf{y})^2 - 4\|\mathbf{x}\|^2 \|\mathbf{y}\|^2 \leq 0
$$

Divide both sides by 4 and a little rearrangement gives:

$$
(\mathbf{x} \cdot \mathbf{y})^2 \leq \|\mathbf{x}\|^2 \|\mathbf{y}\|^2
$$

---

### Step 7: Take the Square Root

Finally, taking the square root of both sides:

$$
| \mathbf{x} \cdot \mathbf{y} | \leq \|\mathbf{x}\| \|\mathbf{y}\|
$$

And there you have it  —  Cauchy – Schwarz <strong><span style="color: var(--color-green);">proven</span></strong>!

---

## Useful Links

- [Dot products and duality | 3Blue1Brown](https://www.youtube.com/watch?v=LyGKycYT2v0&t=621s&pp=ygUVdmVjdG9yIG11bHRpcGxpY2F0aW9u)

...

> [!quote] Links to notes, where the Cauchy – Schwarz inequality is used:
> [[02. Convex Sets#The Cauchy – Schwarz Inequality]]
> ...
