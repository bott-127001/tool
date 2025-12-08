import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function OptionChain() {
  const [chainData, setChainData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/raw-option-chain')
        if (isMounted && response.data && response.data.data) {
          setChainData(response.data)
          setLoading(false)
        } else if (isMounted) {
          // If there's no data, stop loading and show the "waiting" message
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching option chain data:', error)
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    // Fetch data immediately on mount
    fetchData()

    // Set up polling to refresh data every 5 seconds
    const intervalId = setInterval(fetchData, 5000)

    // Cleanup function to clear interval and prevent state updates on unmount
    return () => {
      isMounted = false;
      clearInterval(intervalId)
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  const renderTable = () => {
    if (loading) {
      return <p>Loading option chain data...</p>
    }

    if (!chainData || !chainData.data || chainData.data.length === 0) {
      return <p>No option chain data available. Waiting for market data...</p>
    }

    const options = chainData.data
    const underlyingPrice = options[0]?.underlying_spot_price

    // Find ATM strike
    let atmStrike = 0
    let minDiff = Infinity
    options.forEach(opt => {
      const diff = Math.abs(opt.strike_price - underlyingPrice)
      if (diff < minDiff) {
        minDiff = diff
        atmStrike = opt.strike_price
      }
    })

    return (
      <>
        <p><strong>Underlying Price:</strong> {underlyingPrice?.toFixed(2)} | <strong>ATM Strike:</strong> {atmStrike}</p>
        <p><strong>Expiry Date:</strong> {chainData._expiry_date}</p>
        <div className="option-chain-table-container">
          <table>
            <thead>
              <tr>
                <th colSpan="5" style={{ backgroundColor: '#e9ecef' }}>CALLS</th>
                <th style={{ backgroundColor: '#343a40', color: 'white' }}>Strike</th>
                <th colSpan="5" style={{ backgroundColor: '#e9ecef' }}>PUTS</th>
              </tr>
              <tr>
                <th>OI</th>
                <th>Volume</th>
                <th>IV</th>
                <th>LTP</th>
                <th>Delta</th>
                <th></th>
                <th>Delta</th>
                <th>LTP</th>
                <th>IV</th>
                <th>Volume</th>
                <th>OI</th>
              </tr>
            </thead>
            <tbody>
              {options.map((item, index) => (
                <tr key={index} style={item.strike_price === atmStrike ? { backgroundColor: '#fffbe6' } : {}}>
                  <td>{item.call_options?.market_data?.oi}</td>
                  <td>{item.call_options?.market_data?.volume}</td>
                  <td>{item.call_options?.option_greeks?.iv?.toFixed(2)}</td>
                  <td>{item.call_options?.market_data?.ltp}</td>
                  <td>{item.call_options?.option_greeks?.delta?.toFixed(2)}</td>
                  <td style={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>{item.strike_price}</td>
                  <td>{item.put_options?.option_greeks?.delta?.toFixed(2)}</td>
                  <td>{item.put_options?.market_data?.ltp}</td>
                  <td>{item.put_options?.option_greeks?.iv?.toFixed(2)}</td>
                  <td>{item.put_options?.market_data?.volume}</td>
                  <td>{item.put_options?.market_data?.oi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }

  return (
    <div className="container">
      <div className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/logs">Trade Logs</Link>
        <Link to="/option-chain">Option Chain</Link>
      </div>
      <div className="card">
        <h2>NIFTY50 Option Chain</h2>
        {renderTable()}
      </div>
    </div>
  )
}

export default OptionChain