import React from 'react'

function Rules() {
  return (
    <>
      <div className="card">
        <h2>🔵 TRADE EXECUTION FLOW</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          (What to do, in what order, every single time)
        </p>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#007bff', marginTop: '20px', marginBottom: '10px' }}>STEP 0 — SYSTEM RESET (Start of Day)</h3>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Reset all indicators, states, counters</li>
            <li>No carry-forward bias from previous day</li>
            <li>System state = WAIT</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#007bff', marginTop: '20px', marginBottom: '10px' }}>STEP 1 — CHECK DIRECTION & ASYMMETRY (PRIMARY GATE)</h3>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Evaluate:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8', marginBottom: '10px' }}>
            <li>Opening Location / Acceptance</li>
            <li>Range Extension Asymmetry (REA)</li>
            <li>Delta Efficiency (DE)</li>
          </ul>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Output must be exactly one:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8', marginBottom: '10px' }}>
            <li>BULLISH</li>
            <li>BEARISH</li>
            <li>NEUTRAL</li>
          </ul>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Action:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>If <strong>NEUTRAL</strong> → STOP. No trades today.</li>
            <li>Else → proceed to Step 2</li>
            <li>System state updates to: <strong>DIRECTION_CONFIRMED</strong></li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#007bff', marginTop: '20px', marginBottom: '10px' }}>STEP 2 — CHECK VOLATILITY PERMISSION (TIMING GATE)</h3>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Evaluate:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8', marginBottom: '10px' }}>
            <li>RV(current) vs RV(open-normalized)</li>
            <li>IV(cluster) vs IV-VWAP</li>
          </ul>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Volatility State:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8', marginBottom: '10px' }}>
            <li>CONTRACTION</li>
            <li>TRANSITION</li>
            <li>EXPANSION</li>
          </ul>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Action:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>If <strong>CONTRACTION</strong> → WAIT. Do nothing.</li>
            <li>If <strong>EXPANSION</strong> → Manage only. No fresh entries.</li>
            <li>If <strong>TRANSITION</strong> → proceed to Step 3</li>
            <li>System state updates to: <strong>ENTRY_ALLOWED</strong></li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#007bff', marginTop: '20px', marginBottom: '10px' }}>STEP 3 — PRICE CONFIRMATION (EXECUTION TRIGGER)</h3>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Check minimal price confirmation in direction of bias:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8', marginBottom: '10px' }}>
            <li>Acceptance still holds</li>
            <li>No sharp rejection against bias</li>
            <li>Minor range break / continuation</li>
          </ul>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Action:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>If confirmation fails → WAIT (do not override)</li>
            <li>If confirmation holds → proceed to Step 4</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#007bff', marginTop: '20px', marginBottom: '10px' }}>STEP 4 — GREEKS (EXPRESSION, NOT DECISION)</h3>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Evaluate Greeks only to decide how to express the trade:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8', marginBottom: '10px' }}>
            <li>ATM vs ITM</li>
            <li>Normal size vs reduced size</li>
          </ul>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Rules:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Greeks NEVER change direction</li>
            <li>Greeks NEVER override permission</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#007bff', marginTop: '20px', marginBottom: '10px' }}>STEP 5 — TRADE ENTRY</h3>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Direction = <strong>BULLISH</strong> → Buy CALL</li>
            <li>Direction = <strong>BEARISH</strong> → Buy PUT</li>
            <li>Strike: ATM or 1 ITM</li>
            <li>Expiry: Current week</li>
            <li>Size: As per risk rules</li>
            <li>System state updates to: <strong>IN_TRADE</strong></li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#007bff', marginTop: '20px', marginBottom: '10px' }}>STEP 6 — TRADE MANAGEMENT</h3>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>While in trade:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8', marginBottom: '10px' }}>
            <li>Monitor Volatility State</li>
            <li>Monitor Direction state</li>
          </ul>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Actions:</p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>If Volatility → <strong>EXPANSION</strong> → Partial / trail / protect</li>
            <li>If Direction weakens → Exit</li>
            <li>If SL / Target hit → Exit</li>
            <li>No re-entries unless system fully resets.</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#007bff', marginTop: '20px', marginBottom: '10px' }}>STEP 7 — END OF DAY</h3>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Close remaining naked positions</li>
            <li>Log:</li>
            <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
              <li>Direction state</li>
              <li>Volatility state</li>
              <li>Trade taken or skipped</li>
            </ul>
            <li>Reset system</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#dc3545' }}>🔴 CONFLICT RESOLUTION LOGIC</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          (When signals disagree, this decides for you)
        </p>
        <p style={{ 
          padding: '15px', 
          backgroundColor: '#fff3cd', 
          borderRadius: '8px', 
          border: '2px solid #ffc107',
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#856404'
        }}>
          This section should be always visible on your dashboard.
        </p>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#dc3545', marginTop: '20px', marginBottom: '10px' }}>RULE 1 — HIERARCHY IS ABSOLUTE</h3>
          <div style={{ 
            marginLeft: '20px', 
            lineHeight: '1.8',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            borderLeft: '4px solid #dc3545'
          }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>1. Direction & Asymmetry</div>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>2. Volatility Permission</div>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>3. Greeks</div>
            <div style={{ marginTop: '15px', fontStyle: 'italic' }}>
              Lower layers cannot override higher layers.
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#dc3545', marginTop: '20px', marginBottom: '10px' }}>RULE 2 — DIRECTION vs VOLATILITY</h3>
          <div style={{ overflowX: 'auto', marginTop: '15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Direction</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Volatility</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Bullish / Bearish</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Contraction</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold', color: '#dc3545' }}>NO TRADE</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Bullish / Bearish</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Expansion</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold' }}>Manage only</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Bullish / Bearish</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Transition</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold', color: '#28a745' }}>Trade allowed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#dc3545', marginTop: '20px', marginBottom: '10px' }}>RULE 3 — DIRECTION vs GREEKS</h3>
          <div style={{ overflowX: 'auto', marginTop: '15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Situation</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Direction strong, Greeks opposite</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Reduce size / ITM</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Direction strong, Greeks neutral</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Normal size</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Direction strong, Greeks aligned</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Full size</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '15px', fontStyle: 'italic', color: '#666' }}>
            Never flip direction due to Greeks.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#dc3545', marginTop: '20px', marginBottom: '10px' }}>RULE 4 — VOLATILITY vs GREEKS</h3>
          <div style={{ overflowX: 'auto', marginTop: '15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Situation</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Contraction + bullish Greeks</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold', color: '#dc3545' }}>IGNORE</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Expansion + bullish Greeks</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6', fontWeight: 'bold' }}>NO FRESH ENTRY</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '15px', fontStyle: 'italic', color: '#666' }}>
            Volatility permission dominates Greeks.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#dc3545', marginTop: '20px', marginBottom: '10px' }}>RULE 5 — MULTI-MODEL CONFLICT</h3>
          <div style={{ 
            marginLeft: '20px', 
            lineHeight: '1.8',
            padding: '15px',
            backgroundColor: '#f8d7da',
            borderRadius: '8px',
            borderLeft: '4px solid #dc3545'
          }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              If any two models contradict strongly:
            </p>
            <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', fontSize: '18px', color: '#dc3545' }}>
              ➡ NO TRADE
            </p>
            <p style={{ margin: '10px 0 0 0', fontStyle: 'italic' }}>
              No exceptions. No discretion.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#dc3545', marginTop: '20px', marginBottom: '10px' }}>RULE 6 — DOUBT RULE</h3>
          <div style={{ 
            marginLeft: '20px', 
            lineHeight: '1.8',
            padding: '15px',
            backgroundColor: '#fff3cd',
            borderRadius: '8px',
            borderLeft: '4px solid #ffc107'
          }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              If you feel the need to "interpret":
            </p>
            <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', fontSize: '18px', color: '#856404' }}>
              ➡ System state = WAIT
            </p>
            <p style={{ margin: '10px 0 0 0', fontStyle: 'italic' }}>
              Interpretation = emotional override.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rules

