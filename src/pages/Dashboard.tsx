import { useState, useEffect, useContext } from 'react';
import { Copy, Check, Lock, Unlock, LogOut } from 'lucide-react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const [glitch, setGlitch] = useState(false);
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [binaryMatrix, setBinaryMatrix] = useState<string[]>([]);

  const authContext = useContext(AuthContext);

  const getSecretToken = async () => {
    try {
      const secretCode = await axios.get(BACKEND_URL + "/generatetoken?token=" + localStorage.getItem('token'));
      if(secretCode.status === 200) {
        setToken(secretCode.data.message);
      }
    } catch(e) {
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 800 + Math.random() * 1200);

    // Generate binary matrix
    const rows = 30;
    const cols = 80;
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < cols; j++) {
        row += Math.random() > 0.5 ? '1' : '0';
      }
      matrix.push(row);
    }
    setBinaryMatrix(matrix);

    // Update binary occasionally
    const binaryInterval = setInterval(() => {
      setBinaryMatrix(prev => {
        const newMatrix = [...prev];
        const randomRow = Math.floor(Math.random() * rows);
        let newRow = '';
        for (let j = 0; j < cols; j++) {
          newRow += Math.random() > 0.5 ? '1' : '0';
        }
        newMatrix[randomRow] = newRow;
        return newMatrix;
      });
    }, 300);

    // Simulate API call
    getSecretToken();

    return () => {
      clearInterval(glitchInterval);
      clearInterval(binaryInterval);
    };
  }, []);

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    if(authContext !== null)
      authContext.signout();
      navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 relative overflow-hidden">
      {/* Binary background */}
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        <div className="font-mono text-xs leading-relaxed whitespace-pre">
          {binaryMatrix.map((row, i) => (
            <div key={i}>{row}</div>
          ))}
        </div>
      </div>

      {/* Glitch overlay */}
      {glitch && (
        <>
          <div className="absolute inset-0 bg-green-500 opacity-20 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-red-500 opacity-10 mix-blend-screen" style={{ transform: 'translateX(3px)' }}></div>
          <div className="absolute inset-0 bg-blue-500 opacity-10 mix-blend-screen" style={{ transform: 'translateX(-3px)' }}></div>
        </>
      )}

      <style>{`
        @keyframes glitchAnim {
          0% { transform: translate(0); }
          10% { transform: translate(-5px, 5px); }
          20% { transform: translate(5px, -5px); }
          30% { transform: translate(-5px, -5px); }
          40% { transform: translate(5px, 5px); }
          50% { transform: translate(-5px, 0); }
          60% { transform: translate(5px, 0); }
          70% { transform: translate(0, -5px); }
          80% { transform: translate(0, 5px); }
          90% { transform: translate(-3px, 3px); }
          100% { transform: translate(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .glitch {
          animation: glitchAnim 0.2s infinite;
          filter: contrast(1.2) brightness(1.1);
        }
        .text-glow {
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.5);
        }
        .box-glow {
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.05);
        }
        .slide-down {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>

      <div className={`relative z-10 max-w-4xl mx-auto ${glitch ? 'glitch' : ''}`}>
        {/* Header with Logout */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-glow font-mono">ACCESS GRANTED</h1>
            <p className="text-green-400 text-sm font-mono mt-1">{'>'} SYSTEM_COMPROMISED</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black px-4 py-2 font-mono font-bold transition-all hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]"
          >
            <LogOut size={20} />
            LOGOUT
          </button>
        </div>

        {/* Success Message */}
        {token && (
          <div className="mb-6 border-2 border-green-500 bg-green-950/30 p-6 box-glow slide-down">
            <div className="flex items-center gap-4 mb-4">
              <Unlock className="w-12 h-12 text-green-400" />
              <div>
                <h2 className="text-2xl font-bold text-green-400 text-glow font-mono">CONGRATULATIONS!</h2>
                <p className="text-green-300 font-mono text-sm mt-1">YOU HAVE COMPLETED THE CHALLENGE</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Token Display */}
          <div className="border-2 border-green-500 bg-black box-glow p-6">
            <h3 className="font-mono text-lg mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              SECRET CODE
            </h3>
            {token ? (
              <>
                <div className="bg-gray-900 border border-green-500 p-3 mb-4 break-all font-mono text-xs">
                  {token}
                </div>
                <button
                  onClick={copyToken}
                  className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-4 font-mono flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      COPIED!
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      COPY TOKEN
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center h-32">
                <div className="font-mono text-green-400">EXTRACTING TOKEN...</div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center font-mono text-xs text-green-600">
          <p>{'>'} TIMESTAMP: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
