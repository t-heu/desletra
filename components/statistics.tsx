"use client"

import { Share2, Trophy } from "lucide-react"

interface EStatisticsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  estatisticas: {
    jogados: number
    vitorias: number
    sequenciaAtual: number
    sequenciaMaxima: number
    distribuicao: number[]
  }
  ultimaVitoria: boolean
  tentativasUltimaPalavra: number
}

export default function Statistics({
  open,
  onOpenChange,
  estatisticas,
  ultimaVitoria,
  tentativasUltimaPalavra,
}: EStatisticsProps) {
  if (!open) return null

  const porcentagemVitorias =
    estatisticas.jogados > 0 ? Math.round((estatisticas.vitorias / estatisticas.jogados) * 100) : 0

  const maxDistribuicao = Math.max(...estatisticas.distribuicao, 1)

  function compartilharResultados() {
    const texto = `LetraMix - Estatísticas
🎯 ${estatisticas.jogados} jogos
🏆 ${porcentagemVitorias}% de vitórias
🔥 ${estatisticas.sequenciaAtual} sequência atual
⭐ ${estatisticas.sequenciaMaxima} melhor sequência`

    if (navigator.share) {
      navigator.share({
        title: "LetraMix - Minhas Estatísticas",
        text: texto,
      })
    } else {
      navigator.clipboard.writeText(texto)
      alert("Estatísticas copiadas para a área de transferência!")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-[#020817] w-full max-w-md rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-center w-full text-white">
            {ultimaVitoria ? (
              <div className="flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Parabéns!
              </div>
            ) : (
              "Estatísticas"
            )}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            onClick={() => onOpenChange(false)}
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Estatísticas principais */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl text-white font-bold">{estatisticas.jogados}</div>
              <div className="text-sm text-gray-500">Jogados</div>
            </div>
            <div>
              <div className="text-2xl text-white font-bold">{porcentagemVitorias}</div>
              <div className="text-sm text-gray-500">Vitórias %</div>
            </div>
            <div>
              <div className="text-2xl text-white font-bold">{estatisticas.sequenciaAtual}</div>
              <div className="text-sm text-gray-500">Sequência Atual</div>
            </div>
            <div>
              <div className="text-2xl text-white font-bold">{estatisticas.sequenciaMaxima}</div>
              <div className="text-sm text-gray-500">Melhor Sequência</div>
            </div>
          </div>

          {/* Distribuição de tentativas */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Distribuição de Tentativas</h3>
            <div className="space-y-2">
              {estatisticas.distribuicao.map((count, index) => {
                const tentativa = index + 1
                const porcentagem = maxDistribuicao > 0 ? (count / maxDistribuicao) * 100 : 0
                const isUltimaTentativa = ultimaVitoria && tentativasUltimaPalavra === tentativa

                return (
                  <div key={tentativa} className="flex items-center gap-2">
                    <span className="w-4 text-sm font-medium text-white">{tentativa}</span>
                    <div className="flex-1 relative">
    <div
  className={`h-6 rounded flex items-center justify-end px-2 text-sm font-medium transition-all duration-500 ${
    count === 0
      ? "bg-[#0a1121] text-gray-400"
      : isUltimaTentativa
        ? "bg-green-500 text-white"
        : "bg-white text-black"
  }`}
  style={{ width: `${Math.max(porcentagem, count > 0 ? 15 : 8)}%` }}
>
  {count > 0 && <span>{count}</span>}
</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Botão de compartilhar */}
          <div className="flex justify-center">
            <button
              onClick={compartilharResultados}
              className="flex items-center gap-2 bg-white text-[#222] px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Compartilhar Estatísticas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
