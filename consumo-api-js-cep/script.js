// AJAX - Requisição assíncrona em JAVA XML

$(document).ready(function(){
    console.log('JavaScript funcionando!');

    // Seleciona componente (substitui o GetElement)
    $('#retornoCEP').hide();
    // Agendar um evento com ON e passar uma function que retornará um valor(Dentro da função pega a info do campo CEP)
    $('#cep').on('blur',function(){
        // Pegando informação passada no campo CEP
        // console.log($('#cep').val());

        // Salvando todo o campo CEP numa var
        var inputCep = $('#cep');
        // Selecionando o valor passado no campo atraves da variável
        console.log(inputCep.val());

        // Chama a Func e passa outra func como parametro(essa função retorna o cep que será enviado na requisição da API), depois disso
        buscaCEP(inputCep.val()).then(
            (response) => {
                console.log(response);
                // Valida se o retorno da requisição não é nulo ou vazio
                if(response && response.cep !== ''){
                    // Mostra os campos que estavam escondidos do HTML
                    $('#retornoCEP').show();
                    // pega o id da tag HTML e seta o valor nele, de acordo com o que retornou da requisição
                    $('#rua').val(response.logradouro);
                    $('#bairro').val(response.bairro);
                    $('#cidade').val(response.localidade);
                    $('#UF').val(response.uf);
                }
            }
        );
    });
});

// Função para buscar cep com a API 'VIACEP'
function buscaCEP(cep){
    // link para requisição da API, passando como variavel no meio da URL de busca o parametro
    var urlAPI = `https://viacep.com.br/ws/${cep}/json/`;

    // função retorna a requesição, chama a função fetch passando como parametro o URL da API para busca
    return fetch(urlAPI).then(resp => resp.json());
}
