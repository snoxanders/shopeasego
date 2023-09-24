import { useState } from 'react'


function ListaDinamica({ listaCompras, setListaCompras }) {

  /*================================================================================================================================================== */
  /* Essa e a logica do botao checar */
  /* essa parte serve para criar um array de itens ativos, no caso nao tem nenhum ainda */
  const [itensAtivos, setItensAtivos] = useState([]);
  /* essa parte serve para eu fazer uma funcao que quando e ativada ela muda de false para true e se utilizada novamente , de true para false */
  const toggleItem = (index) => {
    const novosItensAtivos = [...itensAtivos];
    novosItensAtivos[index] = !novosItensAtivos[index];

    setItensAtivos(novosItensAtivos);
  }
  /*================================================================================================================================================== */


  /*================================================================================================================================================== */
  /* logica para adicionar item */
  /* primeiro criamos uma variavel novoItem para podermos manipular o estado dela que coemcara com '' nada */
  const [novoItem, setNovoItem] = useState('')
  /* agora fazemos uma concao que adiciona o item, mas primeiro precisamos checar se o input esta sem nada, por isso usamos o trim */
  /* se o input estiver vazio nos pegamos o que foi coletado no onChange pelo target.value usando o setstate la e damos um push na lista com esse valor */
  /* no final dessa operacao setamos novamente com o setNovoItem o novoItem para '' ficar vazio para a proxima palavra ser adicionada */
  const adicionarItem = () => {
    if (novoItem.trim() !== '') {
      listaCompras.push(novoItem);
      setNovoItem('');
    }
  }

  /*================================================================================================================================================== */

  /*================================================================================================================================================== */

  /*logica botao excluir*/
  /* criar uma funcao ExcluirItem e colocar um index a lista e a set lista como argumento */
  /* criar uma nova lista para manipular ela e nusar um filter... se o index do filter for diferente do index da funcao... joga na nova lista */
  /* isso faz com que a lista tenha somente os itens diferentes do clicado */
  /* agora seta a lista original com as infos da nova lista  */
  function ExcluirItem(index, listaCompras, setListaCompras) {
    const novaListaCompras = listaCompras.filter((item, i) => i !== index);
    setListaCompras(novaListaCompras);
  }

  /*================================================================================================================================================== */

  /* logica botao editar */
  /* primeiro crio uma variavel de estado itemEditando para capitar o index do item da lista  */
  /* depois crio uma variavel de estado itemEditado para iniciar um item com o valor de nada  */

  const [intemEditando, seteItemEditando] = useState(null);
  const [itemEditado, setItemEditado] = useState('')

  /* agora crio uma funcao para setar o valor do index do item a variavel de itemEditando, para saber que e ele que eu estou trabalhando */

  function selecionarItem(index) {
    seteItemEditando(index);
  }

  /* agora faco uma funcao que editarItem que vai pegar dois argumentos , o index do item e o itemEditado que e o valor pego pelo tarfet.value na no input  */
  /* depois checo se ele esta vazio com o trim, se estiver vazio crio uma nova lista identica a lista original. */
  /* pego o index do item da copia da lista que e exatamente o item que quero trabalhar e atribuo um novo valor a ele, jkustamente o vlaor pego pelo input */
  /* por fim seto o valor na lista antiga para editar, seto itemEditado como '' novamente e seto item editando para null novamente para resetar os estados */

  function editarItem(index, itemEditado) {
    if (itemEditado.trim() !== '') {
      const novaLista = [...listaCompras];
      novaLista[index] = itemEditado;
      setListaCompras(novaLista);
      setItemEditado('')
      seteItemEditando(null);
    }
  }




  return (
    <div className='MainContanier'>
      <input className='AdicionarInput' type="text" placeholder='Escreva um Item' onChange={(e) => setNovoItem(e.target.value)} />
      <button className='BttAdicionar' onClick={adicionarItem}>ADICIONAR</button>
      <div className='BttsContainer'>
        <ul>
          {listaCompras.map((item, index) => (
            <div key={index} className='ListContainer'>
              <div className='ItemContainer'>

                <button className='BttCheck' onClick={() => toggleItem(index)}>Check</button>
                <li className={itensAtivos[index] ? 'Item' : 'ItensPadrao'} key={index}>
                  {item}
                </li>
                <button className='BttEditar' onClick={() => selecionarItem(index)}>Editar</button>
                <button className='BttExcluir' onClick={() => ExcluirItem(index, listaCompras, setListaCompras)}>Excluir</button>
              </div>
              {intemEditando === index ? (
                <>
                  <input
                    className='EditarInput'
                    value={itemEditado}
                    onChange={(e) => setItemEditado(e.target.value)}
                  />
                  <button className='BttSalvar' onClick={() => editarItem(index, itemEditado)}>Salvar</button>
                </>
              ) : null}
            </div>

          ))}
        </ul>
      </div>
    </div>
  )

}



export default ListaDinamica;