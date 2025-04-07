// instruçoes do jogo

const instructionsTxt = `
  <div>
    <h1>Instruções do Jogo: Ludo</h1>
    <h2>Visão Geral</h2>
    <p>
      Ludo é um jogo de tabuleiro para <strong>2 a 4 jogadores</strong>. Cada jogador escolhe uma entre as 
      <strong>quatro cores disponíveis</strong> (vermelho, azul, verde e amarelo) para representar seus peões.
    </p>
    <p>
      O objetivo é levar todos os <strong>4 peões</strong> do jogador até o <strong>centro do tabuleiro</strong>, 
      após completar uma volta, antes dos adversários.
    </p>
    <hr />
    <h2>Regras do Jogo</h2>
    <h3>1. Preparação</h3>
    <ul>
      <li>Cada jogador escolhe uma cor.</li>
      <li>Todos os peões começam na <strong>base</strong> (área de partida do jogador).</li>
      <li>A ordem de jogo é definida por uma rolagem inicial de dado, onde o maior número joga primeiro.</li>
    </ul>
    <h3>2. Início da Partida</h3>
    <ul>
      <li>Para mover um peão da base para o tabuleiro, é necessário tirar <strong>6</strong> no dado.</li>
      <li>Se não houver peões no tabuleiro e o jogador não tirar 6, a vez passa para o próximo (sentido horário).</li>
      <li>Se tirar 6 e já tiver peões em jogo, pode escolher entre <strong>liberar um novo peão</strong> ou <strong>mover um já existente</strong>.</li>
    </ul>
    <h3>3. Movimentação</h3>
    <ul>
      <li>O jogador lança o dado e move um de seus peões conforme o número tirado.</li>
      <li>Ao tirar 6, o jogador ganha <strong>uma nova jogada</strong>.</li>
    </ul>
    <h3>4. Captura de Peões</h3>
    <ul>
      <li>Se um peão cair em uma casa ocupada por um adversário, o peão adversário <strong>retorna à base</strong>.</li>
      <li><strong>Casas de partida são protegidas</strong> — não é possível capturar peões nelas.</li>
    </ul>
    <h3>5. Fim da Volta</h3>
    <ul>
      <li>Ao completar uma volta, o peão entra na trilha final rumo ao <strong>centro do tabuleiro</strong>.</li>
      <li>O avanço até o centro exige o número exato. Se o valor do dado for maior, o peão não se move.</li>
    </ul>
    <hr />
    <h2>Condições de Jogo</h2>
    <ul>
      <li>Não é permitido <strong>passar a vez intencionalmente</strong> se houver uma jogada válida.</li>
      <li>Se nenhum movimento for possível, a vez é passada automaticamente.</li>
      <li>Vence quem <strong>levar todos os 4 peões ao centro do tabuleiro primeiro</strong>.</li>
    </ul>
    <p><strong>Divirta-se jogando Ludo!</strong></p>
    <h2>Clique na Tela para Sair</h2>
  </div>
`
// efeito colateral manipulação de DOM
// Retorna o primeiro elemento que bate com o seletor
const query = (selector) => document.querySelector(selector)

query("#instructions").innerHTML = instructionsTxt
query("#instructions").onclick = () => {
    query("#instructions").remove()
}