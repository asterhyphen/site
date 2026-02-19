import { useEffect, useState } from "react";
import { autoDecode, runAllDecoders, type DecoderResult } from "../utils/decoder";
import ctfIcon from "../assets/icons/ctf.png";
import Footer from "../components/Footer";

export default function CTF() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<DecoderResult[]>([]);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
  document.title = "CTFriend";
  const link =
    document.querySelector("link[rel='icon']") ||
    document.createElement("link");
  link.setAttribute("rel", "icon");
  link.setAttribute("href", ctfIcon);
  document.head.appendChild(link);
}, []);


  function decode() {
    if (!input.trim()) return;
    setOutputs(auto ? [autoDecode(input)] : runAllDecoders(input));
  }

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="prompt">$</span> CTFriend
      </div>

      <section className="section">
        <p className="command"><span className="yellow">&gt; paste input</span></p>
        <div className="content">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste text to decrypt / decode"
          />
          <div className="controls">
            <button onClick={decode}>Decode</button>
            <button onClick={() => setOutputs(runAllDecoders(input))}>Decode All</button>
            <button className="toggle" onClick={() => setAuto(!auto)}>
              Auto-detect: {auto ? "ON" : "OFF"}
            </button>
            <button onClick={() => { setInput(""); setOutputs([]); }}>Clear</button>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="command"><span className="yellow">&gt; outputs</span></p>
        <div className="content">
          {outputs.map((o, i) => (
            <div key={i} className="panel">
              <div className="label">
                <div className="name">{o.name}</div>
                <button onClick={() => navigator.clipboard.writeText(o.output)}>Copy</button>
              </div>
              <pre className="result">
                    {
                        o.output.length > 1200
                        ? o.output.slice(0, 1200) + "\n… (truncated)"
                        : o.output
                    }
            </pre>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
