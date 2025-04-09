---
layout: post
title: Calculate S-matrix of Networks
date: 2025-4-9
author: Yanfei Tang
tags: [circuit model, python]
comments: false
toc: true
pinned: false
---

This post is about S-parameter of networks.

<!-- more -->

## 1. Impedance of Resistor, Capacitor and Inductor[^1]

Electrical impedance is the opposition that a circuit presents to a current when a voltage is applied. It is a generalization of resistance from direct current (DC) to alternating current (AC), and, like resistance, it is measured in ohms (Ω). Impedance is the combined effect of resistance, inductance, and capacitance in an **AC circuit**.

Unlike resistance, which has only magnitude, impedance extends the concept of resistance to alternating current (AC) circuits, and possesses both magnitude and phase. Therefore, the impedance is represented as a complex number. The symbol is usually $Z$. Polar form $\| Z \| \angle \theta$ is sometimes used to represent impedance. Cartesian complex number representation is more often used. The impedance is defined as 

$$
Z = R + jX, \tag{1}
$$

where the real part of the impedance is the resistance $R$ and the imaginary part is the reactance $X$. 

### 1.1 Resistor

The impedance of an ideal resistor is purely real and is called resistive impedance:

$$
Z_R = R, \tag{2}
$$

where $R$ is the resistance with SI unit of Ohm ($\Omega$).

### 1.2 Capacitor

The impedance of capacitors is 

$$
Z_C = \frac{1}{j \omega C}, \tag{3}
$$

where $\omega$ is the angular frequency and $C$ is the capacitance with SI unit of Farad ($F$).

### 1.3 Inductor

The impedance of inductor is 

$$
Z_L = j \omega L, \tag{4}
$$

where $L$ is the inductance of SI unit of Henry ($H$). 

### 1.4 Combining impedance

For components connected in series, the current through each circuit element is the same. The total impedance is the sum of the component impedances.

$$
Z_{series} = Z_1 + Z_2 + \cdots + Z_n. \tag{5}
$$

<p align="center">
   <img src="/images/2025/Impedances_in_series.svg.png" alt="drawing" align="middle" style="width:400px;" />
   <em>Fig.1 Components in series.</em>
</p>

For components connected in parallel, the voltage across each circuit element is the same. Hence the inverse total impedance is the sum of the inverses of the component impedances:

$$
\frac{1}{Z_{parallel}} = \frac{1}{Z_1} + \frac{1}{Z_2} + \cdots + \frac{1}{Z_n}. \tag{6}
$$

<p align="center">
   <img src="/images/2025/Impedances_in_parallel.svg.png" alt="drawing" align="middle" style="width:400px;" />
   <em>Fig.2 Components in parallel.</em>
</p>

For two components connected in parallel, the impedance is

$$
Z_{parallel} = \frac{Z_1 Z_2}{Z_1 + Z_2}. \tag{7}
$$


## 2. Impedance and Scattering Matrix[^2]

An arbitrary N-port microwave network is shown in Figure. The incident $(V_n^+, I_n^+)$  and reflected $(V_n^-, I_n^-)$ waves are defined at a specific point on the $n$th plane. The impedance matrix $\mathbf{Z}$ of the microwave network relates the voltages and currents as

$$
\begin{bmatrix}
V_1 \\
V_2 \\
\vdots \\
V_N
\end{bmatrix} = 
\begin{bmatrix}
Z_{11} & Z_{12} & \cdots & Z_{1N}  \\
Z_{21} &        &        & \vdots \\
\vdots &        &        & \vdots \\
Z_{N1} & \cdots & \cdots & Z_{NN}
\end{bmatrix} 
\begin{bmatrix}
I_{1}   \\
I_{2}  \\
\vdots  \\
I_{N} 
\end{bmatrix}, \tag{8}
$$

where $V_n = V_n^+ +V_n^-$ and $I_n = I_n^+ - I_n^-$. 

<p align="center">
   <img src="/images/2025/nport.png" alt="drawing" align="middle" style="width:400px;" />
   <em>Fig.3 Components in parallel.</em>
</p>

From the above equation, we see that the matrix element $Z_{ij}$ can be computed as

$$
Z_{ij} = \frac{V_i}{I_j} \Big|_{I_k=0 \ \text{for} \ k \neq j}. \tag{9}
$$

The formula states that $Z_{ij}$ can be found by driving port $j$ with the current $I_j$,  open circuiting all other ports (thus $I_k = 0$ for $k \neq j$), and measuring the open-circuit voltage at port $i$.  

The S-parameter (or Scattering matrix) describes how wave interacts with the device under test (DUT). For historical reason, the word **scatter** is used to refer hit or collide. The wave that scatters back to the source is called reflected wave and the wave that scatters through the device is referred to transmitted wave. In the frequency domain, the instrument used to measure the reflected and transmitted response of the sine waves is a vector network analyzer (VNA). Vector refers to the fact that both the magnitude and phase of the sine wave are being measured. A scalar network analyzer just measures the amplitude of the sine wave, not its phase. The frequency domain reflected and transmitted terms are referred to as specific S-parameters, such as S11 and S21 or the return and insertion loss.

<p align="center">
   <img src="/images/2025/scattering.png" alt="drawing" align="middle" style="width:600px;" />
   <em>Fig.4 Components in parallel.</em>
</p>


The scattering matrix is defined in relation to theses incident and reflected voltage waves as 

$$
\begin{bmatrix}
V_1^- \\
V_2^- \\
\vdots \\
V_N^-
\end{bmatrix} = 
\begin{bmatrix}
S_{11} & S_{12} & \cdots & S_{1N}  \\
S_{21} &        &        & \vdots \\
\vdots &        &        & \vdots \\
S_{N1} & \cdots & \cdots & S_{NN}
\end{bmatrix} 
\begin{bmatrix}
V_{1}^+   \\
V_{2}^+  \\
\vdots  \\
V_{N}^+ 
\end{bmatrix}, \tag{10}
$$

A specific element of the scattering matrix can be determined as

$$
S_{ij} = \frac{V_i^-}{V_j^+} \Big|_{V_k^+ = 0 \ \text{for} \ k \neq j}. \tag{11}
$$

In words, the above equation says $S_{ij}$ is found by driving port $j$ with an incident wave of voltage $V_j^+$ and measuring the reflected wave amplitude $V_i^-$ coming out of port $i$. The incident waves on all ports except the $j$th port are set to zero, which means that all ports should be terminated in matched loads to avoid reflections. Thus, $S_{ii}$ is the reflection coefficient seen looking into port $i$ when all other ports are terminated in matched loads, and $S_{ij}$ is the transmission coefficient from port $j$ to port $i$ when all other ports are terminated in matched loads. 

We can derive the scattering matrix from impedance matrix. First, we must assume that the characteristic impedance, $Z_{0n}$ , of all ports are identical. The total voltage and current at the $n$th port can be written as

$$
V_n = V_n^+ + V_n^-, \\
I_n = I_n^+ - I_n^- = \frac{1}{Z_{0n}} (V_n^+ - V_n^-). \tag{12}
$$

From the definition of $\mathbf{Z}$ , we can have

$$
\mathbf{Z} \cdot \mathbf{I} = \mathbf{Z} \cdot \mathbf{Z_0}^{-1} (\mathbf{V^+} - \mathbf{V^-} ) = \mathbf{V} =  \mathbf{V^+} + \mathbf{V^-}. \tag{13}
$$

The above equation can be organized as 

$$
(\mathbf{Z} \cdot \mathbf{Z_0^{-1}} + \mathbf{I}) \mathbf{V^{-}} = (\mathbf{Z} \cdot \mathbf{Z_0^{-1}} - \mathbf{I}) \mathbf{V^+} \\
(\mathbf{Z}  + \mathbf{Z_0}) \mathbf{V^{-}} = (\mathbf{Z}  - \mathbf{Z_0}) \mathbf{V^+}, \tag{14}
$$

where $\mathbf{I}$ is the identity matrix. Therefore, the scattering matrix can be computed as

$$
\mathbf{S} = (\mathbf{Z} + \mathbf{Z_0})^{-1} (\mathbf{Z} - \mathbf{Z_0}). \tag{15}
$$


## 3. Two Port Network

### 3.1 T-Network

We can apply the above theory to a two-port T-network in the Fig.5 of Pozar[^2]. 

<p align="center">
   <img src="/images/2025/tnetwork.png" alt="drawing" align="middle" style="width:600px;" />
   <em>Fig.5 T-network.</em>
</p>

The $Z_{11}$ can be found as the input impedance of port 1 when port 2 is open-circuited:

$$
Z_{11} = \frac{V_1}{I_1} \Big|_{I_2 = 0} = Z_A +Z_C. \tag{16}
$$

Similarly, $Z_{22}$ is $Z_B + Z_C$. The transfer impedance $Z_{12}$ can be found by measuring the open-circuit voltage at port 1 when a current $I_2$  is applied at port 2, 

$$
Z_{12} = \frac{V_1}{I_2} \Big|_{I_1 = 0} = \frac{ \frac{Z_C}{Z_B + Z_C} V_2 }{I_2} = Z_C. \tag{17}
$$

Therefore, the impedance matrix for two-port T-network is

$$
\mathbf{Z} = 
\begin{bmatrix}
Z_A+Z_C & Z_C  \\
Z_C     & Z_B + Z_C  
\end{bmatrix}. \tag{18}
$$

We assume that the matched impedances of port 1 and port 2 are identical, $Z_{01} = Z_{02} $. In matrix form, it gives

$$
\mathbf{Z_0} = \begin{bmatrix}
Z_{01} & 0  \\
0     & Z_{02}
\end{bmatrix}. \tag{19}
$$

The scattering matrix of the T-network can be computed from Eq.(14). 


### 3.2 $\Pi$- Network

We consider a pi-network in the following[^4]:

<p align="center">
   <img src="/images/2025/pinetwork.png" alt="drawing" align="middle" style="width:600px;" />
   <em>Fig.6 pi-network.</em>
</p>

The $Z_{11}$ can be found as the input impedance of port 1 when port 2 is open-circuited:

$$
Z_{11} = \frac{V_1}{I_1} \Big|_{I_2 = 0} = Z_A || (Z_B + Z_C) = \frac{Z_A(Z_B + Z_C)}{Z_A + Z_B + Z_C}. \tag{20}
$$

Similarly, we can obtain $Z_{22}$ by driving port 2 when port 1 is open-circuited, $Z_{22} = \frac{Z_C(Z_A + Z_B)}{Z_A + Z_B + Z_C}$. 

The value of $Z_{12}$ can be found as the ratio of open circuit voltage drop $V_1$ measured across port 1 to the current $I_2$,

$$
Z_{12} = \frac{V_1}{I_2} \Big|_{I_1 = 0}. \tag{21}
$$

The voltage drop $V_1$ can be computed from voltage divider rule $V_1 = \frac{Z_A}{Z_A + Z_B} V_2$. The voltage $V_2$ can be computed from Ohm's law as $V_2 = I_2 \Big(Z_C \|\| (Z_A + Z_B)\Big)$. Thus, the transfer impedance element $Z_{12}$ is

$$
Z_{12} = \frac{V_1}{I_2} \Big|_{I_1 = 0} = \frac{Z_A}{Z_A + Z_B} [Z_C || (Z_A + Z_B)] = \frac{Z_A Z_C}{Z_A + Z_B +Z_C}. \tag{22}
$$

Similarly, $Z_{21}$ can be determined in the same way. Thus, the impedance matrix for the $\Pi$ - network is written in the form

$$
\mathbf{Z} = \frac{1}{Z_A + Z_B + Z_C} \begin{bmatrix}
Z_A(Z_B+Z_C) & Z_A Z_C  \\
Z_A Z_C     & Z_C(Z_A + Z_B)  
\end{bmatrix}. \tag{23}
$$


### 3.3 Square Network

We can consider a square network which is named by me. This type of network is often observed in the literature.

<p align="center">
   <img src="/images/2025/snetwork.png" alt="drawing" align="middle" style="width:600px;" />
   <em>Fig.7 Square-network.</em>
</p>

The $Z_{11}$ can be found as the input impedance of port 1 when port 2 is open-circuited:

$$
Z_{11} = \frac{V_1}{I_1} \Big|_{I_2 = 0} = Z_A || (Z_B + Z_C + Z_D) = \frac{Z_A(Z_B + Z_C + Z_D)}{Z_A + Z_B + Z_C + Z_D}. \tag{24}
$$

Similarly, we can obtain $Z_{22}$ by driving port 2 when port 1 is open-circuited, $Z_{22} = \frac{Z_C(Z_A + Z_B + Z_D)}{Z_A + Z_B + Z_C + Z_D}$. 

The value of $Z_{12}$ can be found as the ratio of open circuit voltage drop $V_1$ measured across port 1 to the current $I_2$,

$$
Z_{12} = \frac{V_1}{I_2} \Big|_{I_1 = 0}. \tag{25}
$$

The voltage drop $V_1$ can be computed from voltage divider rule $V_1 = \frac{Z_A}{Z_A + Z_B +Z_D} V_2$. The voltage $V_2$ can be computed from Ohm's law as $V_2 = I_2 \Big(Z_C \|\| (Z_A + Z_B + Z_D) \Big)$. Thus, the transfer impedance element $Z_{12}$ is

$$
Z_{12} = \frac{V_1}{I_2} \Big|_{I_1 = 0} = \frac{Z_A}{Z_A + Z_B + Z_D} [Z_C || (Z_A + Z_B + Z_D)] = \frac{Z_A Z_C}{Z_A + Z_B +Z_C + Z_D}. \tag{26}
$$

Similarly, $Z_{21}$ can be determined in the same way.

Thus, the impedance matrix for the $\Pi$ - network is written in the form

$$
\mathbf{Z} = \frac{1}{Z_A + Z_B + Z_C + Z_D} \begin{bmatrix}
Z_A(Z_B+Z_C+Z_D) & Z_A Z_C  \\
Z_A Z_C     & Z_C(Z_A + Z_B + Z_D)  
\end{bmatrix}. \tag{27}
$$



## 4. Application

### 4.1 Validation of Theory by Qucs Studio

We can use Example 4.4 of Pozar[^2] to do a simple exercise.  We can begin with T-network. The following is the realization of the code

```python
import numpy as np
import matplotlib.pyplot as plt

class Network:
    """
    Parent class for all 2*2 network types.
    """
    def __init__(self):
        """
        Initializes the network with default parameters.
        """
        self.Z = np.zeros(shape=(2, 2), dtype=np.complex128)
        self.S = np.zeros(shape=(2, 2), dtype=np.complex128)

    def _constructSMatrix(self, Z0):
        """
        Assume that the matched impedance is identical with the parameter Z0.
        Constructs the S matrix for the network.
        """
        self.Z0 = Z0
        U = np.eye(2) * Z0
        self.S = np.linalg.inv(self.Z + U) @ (self.Z - U)
        
class TNetwork(Network):
    """
    Two-port T-network
    """
    def __init__(self, za, zb, zc, Z0):
        
        super().__init__()
        self.za = za
        self.zb = zb
        self.zc = zc

        self._constructZMatrix()
        self._constructSMatrix(Z0)

    def _constructZMatrix(self):
        """
        Construct the Z matrix of the T-network
        """
        z11 = self.za + self.zc
        z12 = self.zc
        z21 = self.zc
        z22 = self.zb + self.zc

        self.Z = np.array([[z11, z12],
                           [z21, z22]])
```

```python
tnet = TNetwork(8.56, 8.56, 141.8, 50)

print("Z matrix:")
print(tnet.Z)

print("S matrix:")
print(tnet.S)

print("Insertion loss:")
print(20 * np.log10(np.abs(tnet.S[0, 1])))
```

Below is the output of the code,

```python
Z matrix:
[[150.36 141.8 ]
 [141.8  150.36]]
S matrix:
[[4.43981086e-05 7.07694671e-01]
 [7.07694671e-01 4.43981086e-05]]
Insertion loss:
-3.003081489040847
```

This simple codes can be validated by Qucs Studio software. We can build the network as follows,

<p align="center">
   <img src="/images/2025/tnetwork_simulation.png" alt="drawing" align="middle" style="width:600px;" />
   <em>Fig.8 Qucs simulation of T-network</em>
</p>

Next, we can realize the $\Pi$-network. 

```python
class PiNetwork(Network):
    """
    Two-port Pi-network
    """
    def __init__(self, za, zb, zc,  Z0):
        
        super().__init__()
        self.za = za
        self.zb = zb
        self.zc = zc

        self._constructZMatrix()
        self._constructSMatrix(Z0)

    def _constructZMatrix(self):
        """
        Construct the Z matrix of the T-network
        """
        zsum = self.za + self.zb + self.zc
        z11 = self.za * (self.zb + self.zc) / zsum
        z12 = self.za * self.zc / zsum
        z21 = self.za * self.zc / zsum
        z22 = self.zc * (self.za + self.zb) / zsum

        self.Z = np.array([[z11, z12],
                           [z21, z22]])
```

```python
pinet = PiNetwork(1, 2, 3, 50)

print("Z matrix:")
print(pinet.Z)

print("S matrix:")
print(pinet.S)

print(f"S11: {20 * np.log10(np.abs(pinet.S[0, 0]))}")
print(f"S12: {20 * np.log10(np.abs(pinet.S[0, 1]))}")
print(f"S21: {20 * np.log10(np.abs(pinet.S[1, 0]))}")
print(f"S22: {20 * np.log10(np.abs(pinet.S[1, 1]))}")
```

This is the output of the above code:

```python
Z matrix:
[[0.83333333 0.5       ]
 [0.5        1.5       ]]
S matrix:
[[-0.96740099  0.01910098]
 [ 0.01910098 -0.94193302]]
S11: -0.2878694209607549
S12: -34.378886767932826
S21: -34.378886767932826
S22: -0.519599575008295
```

The above code is validated by Qucs Studio.

<p align="center">
   <img src="/images/2025/pi_simu.png" alt="drawing" align="middle" style="width:800px;" />
   <em>Fig.9 Qucs simulation of pi-network</em>
</p>


At last, we can realize the square network.

```python
class SquareNetwork(Network):
    """
    Two-port Square-network
    """
    def __init__(self, za, zb, zc, zd, Z0):
        
        super().__init__()
        self.za = za
        self.zb = zb
        self.zc = zc
        self.zd = zd

        self._constructZMatrix()
        self._constructSMatrix(Z0)

    def _constructZMatrix(self):
        """
        Construct the Z matrix of the T-network
        """
        zsum = self.za + self.zb + self.zc + self.zd
        z11 = self.za * (self.zb + self.zc + self.zd) / zsum
        z12 = self.za * self.zc / zsum
        z21 = self.za * self.zc / zsum
        z22 = self.zc * (self.za + self.zb + self.zd) / zsum

        self.Z = np.array([[z11, z12],
                           [z21, z22]])
```

```python
snet = SquareNetwork(1, 2, 3, 4, 50)

print("Z matrix:")
print(snet.Z)

print("S matrix:")
print(snet.S)

print(f"S11: {20 * np.log10(np.abs(snet.S[0, 0]))}")
print(f"S12: {20 * np.log10(np.abs(snet.S[0, 1]))}")
print(f"S21: {20 * np.log10(np.abs(snet.S[1, 0]))}")
print(f"S22: {20 * np.log10(np.abs(snet.S[1, 1]))}")
```

This is the output of the above code:

```python
Z matrix:
[[0.9 0.3]
 [0.3 2.1]]
S matrix:
[[-0.96470322  0.01131307]
 [ 0.01131307 -0.91945094]]
S11: -0.3121254334935324
S12: -38.92839023109278
S21: -38.92839023109278
S22: -0.7294287868456193
```

The square network is validated by Qucs Studio.

<p align="center">
   <img src="/images/2025/s_simu.png" alt="drawing" align="middle" style="width:800px;" />
   <em>Fig.10 Qucs simulation of square-network</em>
</p>


### 4.2 Isolated TSV equivalent circuit model[^5]

Let us go a little bit further. We consider an isolated TSV structure with a simple equivalent circuit model in Ref. [5]. 

<p align="center">
   <img src="/images/2025/tsv.png" alt="drawing" align="middle" style="width:200px;" />
   <em>Fig.11 circuit model of isolated TSV</em>
</p>

As we can see in the Figure, it is a typical T-network.  In order to further validate the theory and code, we can provide some value for the parasite parameter.

| Capacitance | Inductance | Resistance  |
| ----------- | ---------- | ----------- |
| 50 fF       | 50 pH      | 1 m$\Omega$ |

In the python, we can use the following to simulate the TSV circuit model,

```python
class IsolatedTSV():
    """ 
    Isolated TSV model in Weerasekera2009.
    """
    def __init__(self, L, C, R, Z0, f_low, f_high, N):
        """
        Initializes the TSV parameters.
        """
        self.L = L
        self.C = C
        self.R = R
        self.Z0 = Z0
        self.f_low = f_low
        self.f_high = f_high
        self.N = N
        self.f = np.logspace(np.log10(f_low), np.log10(f_high), N)
        self.w = 2 * np.pi * self.f

        self.Z = np.zeros(shape=(2, 2, N), dtype=np.complex128)
        self.S = np.zeros(shape=(2, 2, N), dtype=np.complex128)

        self.za = self.R / 2.0 + 1j * self.w * self.L / 2.0
        self.zb = self.za
        self.zc = 1. / (1j * self.w * self.C)

        for i in range(N):
            
            isolated_tsv = TNetwork(self.za[i],
                                    self.zb[i],
                                    self.zc[i] , 50)
            
            self.S[:, :, i] = isolated_tsv.S
            self.Z[:, :, i] = isolated_tsv.Z
            
isotsv = IsolatedTSV(L_tsv, C_tsv, R_tsv, 50, 1e3, 10e9, 1000)

plt.plot(isotsv.f, 20 * np.log10(np.abs(isotsv.S[0, 1, :])), label='Insertion loss')
plt.xscale('log')  
plt.xlabel('Frequency (Hz)')
plt.ylabel('Insertion loss (dB)')
plt.title('Insertion Loss of Isolated TSV')
plt.grid(True)

print("Insertion loss at 10GHz:")
print(20 * np.log10(np.abs(isotsv.S[0, 1, -1])))


### Insertion loss at 10GHz:
### -0.009752507454361247
```

<p align="center">
   <img src="/images/2025/tsv_insertion.png" alt="drawing" align="middle" style="width:400px;" />
   <em>Fig.12 Insertion loss of TSV</em>
</p>


We can build the circuit model in Qucs Studio as follows,

<p align="center">
   <img src="/images/2025/tsv_simu.png" alt="drawing" align="middle" style="width:800px;" />
   <em>Fig.13 Qucs Simulation of circuit model of TSV</em>
</p>

As we can see, the simulation of Qucs can successfully validate the results from python code.



## 5. Conclusion

We have formulate  the impedance and scattering matrix of three different structures of networks. The theory is validated by using free software Qucs. To simulate more complicated structure of circuit model, it is encouraged to use cascade theory to build much complicated from these three simple network. 


## Reference

[^1]: https://en.wikipedia.org/wiki/Electrical_impedance#Combining_impedances
[^2]: Pozar, David M. *Microwave engineering: theory and techniques*. John wiley & sons, 2021.
[^3]: Bogatin, Eric. *Signal and power integrity--simplified*. Pearson Education, 2010.
[^4]:  Ludwig, Reinhold. *RF Circuit Design: Theory & Applications, 2/e*. Pearson Education India, 2000.
[^5]: Weerasekera, Roshan, et al. "Compact modelling of through-silicon vias (TSVs) in three-dimensional (3-D) integrated circuits." *2009 IEEE International Conference on 3D System Integration*. IEEE, 2009.