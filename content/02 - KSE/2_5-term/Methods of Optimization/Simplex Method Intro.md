---
date: 2025-04-08
tags:
  - kse
  - math/calculus
cssclasses:
  - centered-title
dg-publish: true
---

# Simplex Method Intro

---

## 📌 Problem Setup

Minimize:  
$$
f = -2x_1 - 4x_2
$$

Subject to:
$$
\begin{aligned}
3x_1 + 4x_2 + x_3 &= 1700 \quad \text{(Constraint 1)} \\
2x_1 + 5x_2 + x_4 &= 1600 \quad \text{(Constraint 2)} \\
x_1, x_2, x_3, x_4 &\geq 0
\end{aligned}
$$

We begin with **basic variables** $x_3, x_4$, and **non-basic** $x_1 = 0, x_2 = 0$

---

## 🔹 Initial Basic Feasible Solution

Set:

- $x_1 = 0$, $x_2 = 0$
- Then $x_3 = 1700$, $x_4 = 1600$
- So:  
  $$
  f = -2(0) - 4(0) = 0
  $$

✅ Feasible, but not optimal because $x_1, x_2$ have negative coefficients.

---

## 🔹 Step 1: Bring $x_2$ into the basis

We choose $x_2$ because its coefficient in $f$ is <strong><span style="color: var(--color-red);">more negative</span></strong> (–4).

Let’s determine how far we can increase $x_2$:

From constraint 1:
$$
x_3 = 1700 - 3x_1 - 4x_2 \Rightarrow x_2 \leq 425
$$

From constraint 2:
$$
x_4 = 1600 - 2x_1 - 5x_2 \Rightarrow x_2 \leq 320
$$

🔎 Tightest bound: $x_2 = 320$

So let’s set:

- $x_2 = 320$
- $x_1 = 0$
- Then:
  - $x_3 = 1700 - 4(320) = 420$
  - $x_4 = 1600 - 5(320) = 0$

New basic variables: $x_2, x_3$  
New non-basic variables: $x_1 = 0, x_4 = 0$

New function value:
$$
f = -2(0) - 4(320) = -1280
$$

---

### 🧠 Now express $f - (-1280)$ by removing $x_2$

We solve constraint 2 for $x_2$, since $x_2$ just entered the basis via constraint 2.

From:
$$
2x_1 + 5x_2 + x_4 = 1600 \Rightarrow 5x_2 = 1600 - 2x_1 - x_4 \Rightarrow x_2 = \frac{1600 - 2x_1 - x_4}{5}
$$

Now substitute into $f = -2x_1 - 4x_2$:

$$
f = -2x_1 - 4\left( \frac{1600 - 2x_1 - x_4}{5} \right)
= -2x_1 - \frac{4}{5}(1600 - 2x_1 - x_4)
$$

Distribute:
$$
f = -2x_1 - \left( \frac{6400 - 8x_1 - 4x_4}{5} \right)
= -2x_1 - 1280 + \frac{8x_1}{5} + \frac{4x_4}{5}
$$

Combine like terms:
$$
f = -1280 + \left( -2x_1 + \frac{8x_1}{5} \right) + \frac{4x_4}{5}
= -1280 + \left( \frac{-10x_1 + 8x_1}{5} \right) + \frac{4x_4}{5}
= -1280 + \frac{-2x_1 + 4x_4}{5}
$$

---

### ✅ After Step 1:

$$
\boxed{f - (-1280) = \frac{-2x_1 + 4x_4}{5}} \quad \text{or} \quad \boxed{f + 1280 = \frac{-2x_1 + 4x_4}{5}}
$$

This means:

- Increasing $x_1$ can still decrease $f$ (good),
- But we must check feasibility.

---

## 🔹 Step 2: Try to bring $x_1$ into the basis

We now ask: how much can $x_1$ increase while keeping everything feasible?

Use updated values ($x_2 = 320$):

From constraint 1:
$$
3x_1 + 4(320) + x_3 = 1700 \Rightarrow 3x_1 + 1280 + x_3 = 1700
\Rightarrow x_3 = 420 - 3x_1 \geq 0 \Rightarrow x_1 \leq 140
$$

From constraint 2:
$$
x_4 = 1600 - 2x_1 - 5(320) = 1600 - 1600 - 2x_1 = -2x_1 \Rightarrow x_1 = 0
$$

🔒 $x_1$ is blocked — can't increase without violating $x_4 \geq 0$

So we’re at an **optimal solution**.

---

## ✅ Final Result

**Optimal solution:**

- $x_1 = 0$
- $x_2 = 320$
- $x_3 = 420$
- $x_4 = 0$

**Minimum value of the objective:**
$$
\boxed{f = -1280}
$$

**Objective expressed in non-basic variables:**
$$
\boxed{f - (-1280) = \frac{-2x_1 + 4x_4}{5}}
$$
