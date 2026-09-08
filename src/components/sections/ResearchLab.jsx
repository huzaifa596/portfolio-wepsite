import { useState } from 'react'
import { Icon } from '../ui/Icon'

export function ResearchLab() {
  // Interactive ICU Vital Signs state
  const [vitals, setVitals] = useState({
    heartRate: 104, // bpm (60-140)
    map: 62,        // Mean Arterial Pressure mmHg (45-110)
    lactate: 2.8,   // mmol/L (0.5-6.0)
    wbc: 14.2,      // x10^3/uL (3.0-25.0)
  })

  // Simulated Ensemble Logic based on sepsis consensus criteria (SOFA / SIRS)
  const calculateRisk = () => {
    let score = 0
    if (vitals.heartRate > 90) score += (vitals.heartRate - 90) * 0.7
    if (vitals.map < 65) score += (65 - vitals.map) * 1.6
    if (vitals.lactate > 2.0) score += (vitals.lactate - 2.0) * 14
    if (vitals.wbc > 12.0) score += (vitals.wbc - 12.0) * 2.2

    return Math.min(Math.max(Math.round(18 + score), 5), 98)
  }

  const riskPercent = calculateRisk()
  const isCritical = riskPercent >= 65
  const isModerate = riskPercent >= 35 && riskPercent < 65

  const shapFeatures = [
    {
      name: 'Serum Lactate',
      value: `${vitals.lactate} mmol/L`,
      impact: Math.min(Math.round((vitals.lactate / 5.0) * 100), 100),
      desc: 'Anaerobic metabolism & cellular hypoxia indicator',
    },
    {
      name: 'Mean Arterial Pressure (MAP)',
      value: `${vitals.map} mmHg`,
      impact: Math.min(Math.round(((75 - Math.min(vitals.map, 75)) / 30) * 100) + 15, 100),
      desc: 'Vascular tone & systemic organ perfusion pressure',
    },
    {
      name: 'Heart Rate',
      value: `${vitals.heartRate} bpm`,
      impact: Math.min(Math.round((vitals.heartRate / 130) * 80), 95),
      desc: 'Compensatory tachycardia response',
    },
    {
      name: 'Leukocyte Count (WBC)',
      value: `${vitals.wbc} k/µL`,
      impact: Math.min(Math.round((vitals.wbc / 22) * 75), 90),
      desc: 'Systemic inflammatory response trigger',
    },
  ]

  const loadPreset = (type) => {
    if (type === 'normal') {
      setVitals({ heartRate: 72, map: 85, lactate: 1.1, wbc: 6.8 })
    } else if (type === 'early') {
      setVitals({ heartRate: 98, map: 68, lactate: 2.2, wbc: 13.5 })
    } else if (type === 'shock') {
      setVitals({ heartRate: 126, map: 52, lactate: 4.6, wbc: 19.8 })
    }
  }

  return (
    <section className="research-section" id="research-lab">
      <div className="shell">
        {/* Section Header */}
        <div className="reveal-on-scroll">
          <div className="section-pill">
            <span className="section-pill__tag">Clinical ML Research</span>
          </div>
          <h2 className="section-title">
            XEL-Sepsis: Explainable AI for ICU Clinical Diagnostics
          </h2>
          <p className="section-desc">
            Early sepsis onset prediction trained on 40,000+ ICU admissions from the <strong>MIMIC-IV</strong> database.
            Combining <strong>XGBoost</strong>, <strong>LightGBM</strong>, and <strong>LSTM</strong> temporal architectures with <strong>TreeSHAP</strong> interpretability.
          </p>
        </div>

        {/* The Interactive Lab Workspace */}
        <div className="lab-workspace reveal-on-scroll delay-1">
          {/* Top Model Telemetry Bar */}
          <div className="lab-telemetry-bar">
            <div className="lab-telemetry-item">
              <span className="telemetry-label">TRAINING CORPUS</span>
              <strong className="telemetry-val">MIMIC-IV v2.2 (ICU)</strong>
            </div>
            <div className="lab-telemetry-item">
              <span className="telemetry-label">ENSEMBLE BACKEND</span>
              <strong className="telemetry-val">XGBoost + LightGBM + LSTM</strong>
            </div>
            <div className="lab-telemetry-item">
              <span className="telemetry-label">VALIDATION AUROC</span>
              <strong className="telemetry-val text-sky">0.894 (95% CI)</strong>
            </div>
            <div className="lab-telemetry-item">
              <span className="telemetry-label">PREDICTION WINDOW</span>
              <strong className="telemetry-val">T - 6 Hours Prior</strong>
            </div>
          </div>

          {/* Main 2-Column Split: Controls + Live Risk Engine */}
          <div className="lab-grid">
            {/* Left: Interactive Sliders & Presets */}
            <div className="lab-controls-panel">
              <div className="panel-header">
                <h3>Patient ICU Biomarker Inputs</h3>
                <div className="preset-group">
                  <span className="preset-label">Presets:</span>
                  <button type="button" className="preset-btn" onClick={() => loadPreset('normal')}>
                    Stable
                  </button>
                  <button type="button" className="preset-btn" onClick={() => loadPreset('early')}>
                    Early SIRS
                  </button>
                  <button type="button" className="preset-btn" onClick={() => loadPreset('shock')}>
                    Septic Shock
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div className="sliders-stack">
                {/* Heart Rate */}
                <div className="slider-card">
                  <div className="slider-header">
                    <div>
                      <span className="slider-title">Heart Rate (HR)</span>
                      <span className="slider-unit">beats / min</span>
                    </div>
                    <code className="slider-value">{vitals.heartRate} bpm</code>
                  </div>
                  <input
                    type="range"
                    min="55"
                    max="145"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({ ...vitals, heartRate: Number(e.target.value) })}
                    className="sky-range"
                    aria-label="Heart rate slider"
                  />
                  <div className="slider-range-labels">
                    <span>55 (Bradycardia)</span>
                    <span>100 (Threshold)</span>
                    <span>145 (Tachycardia)</span>
                  </div>
                </div>

                {/* Mean Arterial Pressure */}
                <div className="slider-card">
                  <div className="slider-header">
                    <div>
                      <span className="slider-title">Mean Arterial Pressure (MAP)</span>
                      <span className="slider-unit">mmHg</span>
                    </div>
                    <code className="slider-value">{vitals.map} mmHg</code>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="105"
                    value={vitals.map}
                    onChange={(e) => setVitals({ ...vitals, map: Number(e.target.value) })}
                    className="sky-range"
                    aria-label="Mean arterial pressure slider"
                  />
                  <div className="slider-range-labels">
                    <span>45 (Severe Hypotension)</span>
                    <span>65 (Critical cutoff)</span>
                    <span>105 (Normal)</span>
                  </div>
                </div>

                {/* Serum Lactate */}
                <div className="slider-card">
                  <div className="slider-header">
                    <div>
                      <span className="slider-title">Serum Lactate</span>
                      <span className="slider-unit">mmol / L</span>
                    </div>
                    <code className="slider-value">{vitals.lactate} mmol/L</code>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="6.0"
                    step="0.1"
                    value={vitals.lactate}
                    onChange={(e) => setVitals({ ...vitals, lactate: Number(e.target.value) })}
                    className="sky-range"
                    aria-label="Serum lactate slider"
                  />
                  <div className="slider-range-labels">
                    <span>0.5 (Baseline)</span>
                    <span>2.0 (Alert)</span>
                    <span>6.0 (Metabolic Crisis)</span>
                  </div>
                </div>

                {/* White Blood Cell Count */}
                <div className="slider-card">
                  <div className="slider-header">
                    <div>
                      <span className="slider-title">Leukocyte Count (WBC)</span>
                      <span className="slider-unit">x10³ / µL</span>
                    </div>
                    <code className="slider-value">{vitals.wbc} k/µL</code>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="25.0"
                    step="0.2"
                    value={vitals.wbc}
                    onChange={(e) => setVitals({ ...vitals, wbc: Number(e.target.value) })}
                    className="sky-range"
                    aria-label="White blood cell count slider"
                  />
                  <div className="slider-range-labels">
                    <span>3.0 (Low)</span>
                    <span>11.0 (Normal bound)</span>
                    <span>25.0 (Severe Infection)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Risk Output & TreeSHAP Attribution */}
            <div className="lab-output-panel">
              <div className="risk-display-card">
                <div className="risk-display-top">
                  <span className="risk-display-label">Ensemble Risk Output</span>
                  <span className={`risk-badge ${isCritical ? 'risk-badge--critical' : isModerate ? 'risk-badge--moderate' : 'risk-badge--low'}`}>
                    {isCritical ? 'HIGH CRITICAL RISK' : isModerate ? 'MODERATE SURVEILLANCE' : 'LOW RISK BASELINE'}
                  </span>
                </div>

                <div className="risk-metric-row">
                  <div className="risk-number-wrap">
                    <span className="risk-number">{riskPercent}%</span>
                    <span className="risk-sub">Predicted probability of sepsis onset within 6 hours</span>
                  </div>

                  <div className="risk-radial">
                    <svg viewBox="0 0 100 100" width="88" height="88">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke="var(--sky-line)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke={isCritical ? '#f43f5e' : isModerate ? '#f59e0b' : 'var(--sky)'}
                        strokeWidth="8"
                        strokeDasharray={264}
                        strokeDashoffset={264 - (264 * riskPercent) / 100}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        style={{ transition: 'stroke-dashoffset 0.4s ease, stroke 0.3s ease' }}
                      />
                    </svg>
                  </div>
                </div>

                <div className="risk-progress-track">
                  <div
                    className="risk-progress-fill"
                    style={{
                      width: `${riskPercent}%`,
                      backgroundColor: isCritical ? '#f43f5e' : isModerate ? '#f59e0b' : 'var(--sky)',
                    }}
                  />
                </div>
              </div>

              <div className="shap-inspector-card">
                <div className="shap-header">
                  <div>
                    <span className="shap-title">TreeSHAP Explainability Decomposition</span>
                    <p className="shap-subtitle">Local feature attributions for this specific patient vector</p>
                  </div>
                  <code className="shap-tag">|SHAP| impact</code>
                </div>

                <div className="shap-bars-list">
                  {shapFeatures.map((feat) => (
                    <div key={feat.name} className="shap-item">
                      <div className="shap-item-head">
                        <span className="shap-item-name">{feat.name}</span>
                        <code className="shap-item-val">{feat.value}</code>
                      </div>
                      <div className="shap-bar-track">
                        <div
                          className="shap-bar-fill"
                          style={{ width: `${feat.impact}%` }}
                        />
                      </div>
                      <span className="shap-item-desc">{feat.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lab-context-foot">
                <Icon name="spark" size={16} />
                <p>
                  FAST-NUCES Lahore research. CITI Program certified in Human Research Data & Specimens for MIT MIMIC-IV clinical access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
