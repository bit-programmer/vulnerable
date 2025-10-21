import { useState, useEffect, useContext } from 'react';
import { Eye, EyeOff, Terminal } from 'lucide-react';
import { AuthContext } from '../auth/AuthContext';

export default function HackerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);

  // const terminalLines = [
  //   '> INITIALIZING SECURE CONNECTION...',
  //   '> ESTABLISHING ENCRYPTED TUNNEL...',
  //   '> VERIFYING CREDENTIALS...',
  //   '> ACCESS GRANTED'
  // ];


  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 800 + Math.random() * 1200);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setTerminalText('');

    if(authContext !== null) {
      try {
        await authContext.signin(username, password);
      } catch(e) {
        setIsLoading(false);
      }
    }

    setIsLoading(false);

  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 to-black">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
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
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
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
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
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
        .scanline {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(transparent, rgba(0, 255, 0, 0.3), transparent);
          animation: scanline 4s linear infinite;
        }
        .flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-md">
        {/* Scanline effect */}
        <div className="scanline"></div>

        <div className={`bg-black border-2 border-green-500 box-glow p-8 ${glitch ? 'glitch' : ''}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Terminal className={`w-12 h-12 text-green-500 ${glitch ? 'flicker' : ''}`} />
            </div>
            <h1 className="text-3xl font-bold text-green-500 text-glow mb-2 font-mono">
              SECURE ACCESS
            </h1>
            <p className="text-green-400 text-sm font-mono">
              {'>'} AUTHENTICATION_REQUIRED
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-green-500 text-sm font-mono mb-2">
                {'>'} USERNAME
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-green-500 text-green-400 px-4 py-3 font-mono focus:outline-none focus:border-green-300 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                placeholder="enter_username"
              />
            </div>

            <div>
              <label className="block text-green-500 text-sm font-mono mb-2">
                {'>'} PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-green-500 text-green-400 px-4 py-3 font-mono focus:outline-none focus:border-green-300 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terminal Output */}
            {terminalText && (
              <div className="bg-gray-900 border border-green-500 p-4 font-mono text-xs text-green-400 whitespace-pre-wrap min-h-[100px]">
                {terminalText}
                <span className="inline-block w-2 h-3 bg-green-500 ml-1 animate-pulse"></span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 font-mono uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {isLoading ? '[ AUTHENTICATING... ]' : '[ INITIATE ACCESS ]'}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-green-600 text-xs font-mono">
            <p>{'>'} ENCRYPTED_CONNECTION_ACTIVE</p>
            <p className="mt-1">{'>'} TIMESTAMP: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-green-500"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-green-500"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-green-500"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-green-500"></div>
      </div>
    </div>
  );
}
