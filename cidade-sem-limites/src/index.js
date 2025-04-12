import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function CidadeSemLimites() {
  const [nome, setNome] = useState("");
  const [jogando, setJogando] = useState(false);
  const [local, setLocal] = useState("apartamento");
  const [dinheiro, setDinheiro] = useState(100);
  const [reputacao, setReputacao] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [entrada, setEntrada] = useState("");

  const lugares = {
    apartamento: "Seu apartamento pequeno no centro da cidade.",
    loja: "Uma loja de conveniência com um atendente distraído.",
    delegacia: "A delegacia da cidade, com policiais atentos.",
    rua: "A rua principal, cheia de pessoas indo e vindo.",
    hospital: "Um hospital movimentado com enfermeiros apressados.",
    banco: "O banco central da cidade. Guardas e clientes ocupados.",
    escola: "Uma escola com alunos barulhentos e professores cansados.",
    praça: "Uma praça com árvores, bancos e um músico de rua tocando violão.",
    restaurante: "Um restaurante aconchegante com cheiro de comida fresca."
  };

  const adicionarHistorico = (texto) => {
    setHistorico((h) => [...h, texto]);
  };

  const executarComando = () => {
    const comando = entrada.toLowerCase().trim();
    setEntrada("");

    if (comando.startsWith("ir para")) {
      const destino = comando.replace("ir para", "").trim();
      if (lugares[destino]) {
        setLocal(destino);
        adicionarHistorico(\`Você foi para \${destino}. \${lugares[destino]}\`);
        return;
      } else {
        adicionarHistorico("Esse lugar não existe na cidade.");
        return;
      }
    }

    if (comando === "ver status") {
      adicionarHistorico(
        \`📊 Status: Local: \${local}, Dinheiro: R$\${dinheiro}, Reputação: \${reputacao}\`
      );
      return;
    }

    if (comando.includes("roubar")) {
      if (["loja", "banco", "restaurante"].includes(local)) {
        const sucesso = Math.random() > 0.4;
        if (sucesso) {
          const ganho = Math.floor(Math.random() * 250 + 50);
          setDinheiro(d => d + ganho);
          setReputacao(r => r - 30);
          adicionarHistorico(\`Você roubou e conseguiu R$\${ganho}. Reputação caiu.\`);
        } else {
          setLocal("delegacia");
          setReputacao(r => r - 50);
          adicionarHistorico("Você foi pego tentando roubar e levado à delegacia!");
        }
        return;
      }
    }

    if (comando.includes("trabalhar")) {
      if (["restaurante", "hospital", "escola"].includes(local)) {
        const ganho = Math.floor(Math.random() * 80 + 20);
        setDinheiro(d => d + ganho);
        setReputacao(r => r + 10);
        adicionarHistorico(\`Você trabalhou e ganhou R$\${ganho}. Reputação aumentou.\`);
      } else {
        adicionarHistorico("Você não encontrou trabalho aqui.");
      }
      return;
    }

    // Resposta com IA simulada
    const respostaIA = \`Você decide: '\${comando}'. Uma série de eventos imprevisíveis acontece na cidade...\`;
    adicionarHistorico(\`🧠 \${respostaIA}\`);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      {!jogando ? (
        <div>
          <h2>Cidade Sem Limites</h2>
          <input
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button onClick={() => setJogando(true)} disabled={!nome}>
            Iniciar jogo
          </button>
        </div>
      ) : (
        <div>
          <p>👤 <strong>{nome}</strong> — <strong>{local}</strong> — R${dinheiro} — ⭐ {reputacao}</p>
          <div style={{ height: 200, overflowY: "auto", border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
            {historico.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </div>
          <input
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && executarComando()}
            placeholder="Digite uma ação (ex: ir para loja, roubar, ver status)"
            style={{ width: "70%" }}
          />
          <button onClick={executarComando}>Enviar</button>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CidadeSemLimites />);
