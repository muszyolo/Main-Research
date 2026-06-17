import pandas as pd
import numpy as np
from scipy import stats

def run_tests():
    print("--- Advanced Statistical Suite (Companion Script) ---")
    
    # Sample Data
    sample_a = [12, 15, 18, 20, 22, 24, 25, 29]
    sample_b = [10, 14, 15, 19, 25, 22, 28, 30]
    
    # 1. Descriptive
    print("\n[1] Descriptive Stats (Sample A)")
    print(pd.Series(sample_a).describe())
    
    # 2. T-Test
    t_stat, p_val = stats.ttest_ind(sample_a, sample_b)
    print(f"\n[2] Independent T-Test:\n T-statistic: {t_stat:.4f}, P-value: {p_val:.4f}")
    
    # 3. Mann-Whitney U Test (Non-parametric)
    u_stat, p_val_mw = stats.mannwhitneyu(sample_a, sample_b)
    print(f"\n[3] Mann-Whitney U Test:\n U-statistic: {u_stat:.4f}, P-value: {p_val_mw:.4f}")
    
    # 4. Chi-Square (example frequency table)
    obs = np.array([[10, 10, 20], [20, 20, 20]])
    chi2, p_val_chi, dof, ex = stats.chi2_contingency(obs)
    print(f"\n[4] Chi-Square Test (Mock 2x3 Table):\n Chi2: {chi2:.4f}, P-value: {p_val_chi:.4f}")

if __name__ == "__main__":
    run_tests()
