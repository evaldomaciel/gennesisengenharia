var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
        
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
 
    executeAction: function(htmlElement, event) {
    }

});

/* Objeto que retorna os valores que serão repetidos dentro do código.*/
const genericInfos = {
    datasetName     : "dts_consultaCadastroAtribuicoes", // Nome do dataset que busca os registros
    indexTable      : 1, // Índice utilizado nas tabelas de adição e edição  
    filters         : { // instancia dos filters
        userTarefa  : null,
        groupTarefa : null ,
        userSearch  : null,
        groupSearch : null
    }
}


$(document).ready(() => initWidgetAtribuicoes())

/* Função que roda quando se inicia a widget */
const initWidgetAtribuicoes = () =>{
    getCadastroAtribuicoes()

    initSearchFilter()
}

const initSearchFilter = () =>{
    FLUIGC.switcher.init("#sw_grupo_ou_user")
    
    const instance = {
        filter      : new Filter(),
        dataset     : new Dataset()
    }
    
    const paramsFilter = [ // Array de objetos para iniciar o filter de forma dinâmica e customizada
        {
            instanceFilter  : "userSearch", // Esse é para enviar ao meu atributo userTarefa o retorno do filter
            infos           : { // Essa é a configuração do meu filter, envio sempre de forma dinâmica as infos.
                datasetValues   : instance.dataset.getDataset({datasetName : "colleague"}),
                displayKey      : "colleagueName",
                header: [
                    {
                        'title'     : 'Usuário',
                        'dataorder' : 'colleagueName',
                        'standard'  : true
                    },
                    {
                        'title'     : 'Matrícula',
                        'dataorder' : 'colleaguePK.colleagueId',
                        'standard'  : true
                    }
                ],
                renderContent   : ["colleagueName", "colleaguePK.colleagueId"],
                fieldForm       : `#txt_usuario_tarefa`
            } 
        },
        {
            instanceFilter  : "groupSearch",
            infos           : {
                datasetValues   : instance.dataset.getDataset({datasetName : "group"}),
                displayKey      : "groupPK.groupId",
                header: [
                    {
                        'title'     : 'Usuário',
                        'dataorder' : 'groupPK.groupId',
                        'standard'  : true
                    }
                ],
                renderContent   : ["groupPK.groupId"],
                fieldForm       : `#txt_grupo_tarefa`
            }
        }
    ]

    paramsFilter.forEach(filterConfig => instance.filter.createFilter(filterConfig.infos, filterConfig.instanceFilter))
}

/* Função que busca os valores do dataset de Cadastro de Atribuicoes */
function getCadastroAtribuicoes(){
    const instanceGetDataset = new Dataset()
    const paramDatasetInic = {
        datasetName : genericInfos.datasetName
    }

    const getDataset = instanceGetDataset.getDataset(paramDatasetInic)

    if (getDataset.length > 0) {
        criaTable(getDataset) /* Criação da tabela de apresentação */
    }
}

/* Função que adiciona nova linha na paixfilho de cadastro */
function addNewRow(){
    const instance = {
        actions     : new actionsTable(genericInfos.indexTable),
        filter      : new Filter(),
        dataset     : new Dataset()
    }

    genericInfos.filters.userTarefa = null
    genericInfos.filters.groupTarefa = null


    let row = $("<div class='row'>");
    const cols = instance.actions.add()

    row.append(cols);
    $('#bodyTableAtribuicoes').append(row);
    
    const paramsFilter = [ // Array de objetos para iniciar o filter de forma dinâmica e customizada
    {
        instanceFilter  : "userTarefa", // Esse é para enviar ao meu atributo userTarefa o retorno do filter
        infos           : { // Essa é a configuração do meu filter, envio sempre de forma dinâmica as infos.
            datasetValues   : instance.dataset.getDataset({datasetName : "colleague"}),
            displayKey      : "colleagueName",
            header: [
                {
                    'title'     : 'Usuário',
                    'dataorder' : 'colleagueName',
                    'standard'  : true
                },
                {
                    'title'     : 'Matrícula',
                    'dataorder' : 'colleaguePK.colleagueId',
                    'standard'  : true
                }
            ],
            renderContent   : ["colleagueName", "colleaguePK.colleagueId"],
            fieldForm       : `#fl_usuario___${genericInfos.indexTable}`
        } 
    },
    {
        instanceFilter  : "groupTarefa",
        infos           : {
            datasetValues   : instance.dataset.getDataset({datasetName : "group"}),
            displayKey      : "groupPK.groupId",
            header: [
                {
                    'title'     : 'Usuário',
                    'dataorder' : 'groupPK.groupId',
                    'standard'  : true
                }
            ],
            renderContent   : ["groupPK.groupId"],
            fieldForm       : `#fl_grupo___${genericInfos.indexTable}`
        }
    }
    ]

    paramsFilter.forEach(filterConfig => instance.filter.createFilter(filterConfig.infos, filterConfig.instanceFilter))

    FLUIGC.switcher.init("#sw_grupo_user___" + genericInfos.indexTable)
    genericInfos.indexTable++
}

/* Função que remove a linha na paixfilho de cadastro */
function deleteTabela(id) {
    id.parentElement.parentElement.parentElement.parentElement.remove()
    $('#hd_cod_documento').val('')
    genericInfos.filters.userTarefa = null
    genericInfos.filters.groupTarefa = null
}

function editaRegistro(row){
    const infosEdit = {
        documentId          : row.parentElement.parentElement.children[0].children[0].innerHTML,
        idProcesso          : row.parentElement.parentElement.children[1].children[0].innerHTML,
        userGrupoAtribuido  : row.parentElement.parentElement.children[2].children[0].innerHTML,
        codAtribuicao       : row.parentElement.parentElement.children[2].children[1].value,
        tipoAtribuicao      : row.parentElement.parentElement.children[2].children[2].value,
        descAtividade       : row.parentElement.parentElement.children[3].children[0].innerHTML,
    }

    const instance = {
        actions     : new actionsTable(genericInfos.indexTable, infosEdit),
        filter      : new Filter(),
        dataset     : new Dataset(),
        contentMan  : new ContentManipulation() 
    }

    genericInfos.filters.userTarefa = null
    genericInfos.filters.groupTarefa = null

    const bodyAtribuicoes = $('#bodyTableAtribuicoes')[0].children.length
    
    if (bodyAtribuicoes == 0) {

        instance.contentMan.setValue("hd_cod_documento", infosEdit.documentId)
        let rowAppend = $("<div class='row'>");
        const htmlInstance = instance.actions.edit()
        rowAppend.append(htmlInstance);
        $('#bodyTableAtribuicoes').append(rowAppend);
        
        const paramsFilter = [ // Array de objetos para iniciar o filter de forma dinâmica e customizada
            {
                instanceFilter  : "userTarefa", // Esse é para enviar ao meu atributo userTarefa o retorno do filter
                infos           : { // Essa é a configuração do meu filter, envio sempre de forma dinâmica as infos.
                    datasetValues   : instance.dataset.getDataset({datasetName : "colleague"}),
                    displayKey      : "colleagueName",
                    header: [
                        {
                            'title'     : 'Usuário',
                            'dataorder' : 'colleagueName',
                            'standard'  : true
                        },
                        {
                            'title'     : 'Matrícula',
                            'dataorder' : 'colleaguePK.colleagueId',
                            'standard'  : true
                        }
                    ],
                    renderContent   : ["colleagueName", "colleaguePK.colleagueId"],
                    fieldForm       : `#fl_usuario___${genericInfos.indexTable}`
                } 
            },
            {
                instanceFilter  : "groupTarefa",
                infos           : {
                    datasetValues   : instance.dataset.getDataset({datasetName : "group"}),
                    displayKey      : "groupPK.groupId",
                    header: [
                        {
                            'title'     : 'Usuário',
                            'dataorder' : 'groupPK.groupId',
                            'standard'  : true
                        }
                    ],
                    renderContent   : ["groupPK.groupId"],
                    fieldForm       : `#fl_grupo___${genericInfos.indexTable}`
                }
            }
        ]

        paramsFilter.forEach(filterConfig => instance.filter.createFilter(filterConfig.infos, filterConfig.instanceFilter))

        FLUIGC.switcher.init("#sw_grupo_user___" + genericInfos.indexTable)

        if (infosEdit.tipoAtribuicao == "grupo") {
            const group = {
                "groupPK.groupId" : infosEdit.userGrupoAtribuido
            }
            genericInfos.filters.groupTarefa.add(group)
            FLUIGC.switcher.setTrue("#sw_grupo_user___" + genericInfos.indexTable)

        }else{
            const user = {
                "colleagueName"             : infosEdit.userGrupoAtribuido,
                "colleaguePK.colleagueId"   : infosEdit.codAtribuicao
            }
            genericInfos.filters.userTarefa.add(user)
            FLUIGC.switcher.setFalse("#sw_grupo_user___" + genericInfos.indexTable)
        }

        $('html, body').animate({ scrollTop: 0 }, 1000);
        genericInfos.indexTable++
    }else{
        FLUIGC.toast({
            title: 'Edição interrompida! <br>',
            message: 'Somente é permitido a edição de um registro.',
            type: 'warning'
        });
    }


}

/* Função que cria a tabela com os registros de dataset */
function criaTable(dataset_values) {
    $('#atribuicoes').html('')

    for (let i = 0; i < dataset_values.length; i++) {

        const linha = $("<div class='line'>")
        const colunas = `
            <div class="row content-line-table">
                <div class="content-line col-md-1"> 
                    <span>${dataset_values[i].documentid}</span>
                </div>
                <div class="content-line col-md-3"> 
                    <span>${dataset_values[i].txt_iden_atividade}</span>
                </div>
                <div class="content-line col-md-3"> 
                    <span>${dataset_values[i].txt_atri_atividade}</span>
                    <input type='hidden' id='hd_cod_user___${i}' name='hd_cod_user___${i}' value='${dataset_values[i].hd_cod_user_atv}'>
                    <input type='hidden' id='hd_tipo_atribui___${i}' name='hd_tipo_atribui___${i}' value='${dataset_values[i].hd_tipo_atribuicao}'>
                </div>
                <div class="content-line col-md-3"> 
                    <span>${dataset_values[i].txt_desc_atv}</span>
                </div>
                <div class="content-button col-md-2"> 
                    <button type="button" class="btn btn-warning" onclick="editaRegistro(this)">Editar</button>
                    <button type="button" class="btn btn-danger" style="margin-left: 10px;" onclick="deletaRegistro(this)">Excluir</button>
                </div>
            </div>
        `

        linha.append(colunas)
        $('#atribuicoes').append(linha)
    }

}

/* Função que altera o switch informando se é um grupo ou não, alimentando o hidden e também escondendo campos */
function setSwitchGroupOrUser(switchValue) {
    const infosSwitch = {
        checkedSwitch           : switchValue.checked,
        index                   : switchValue.id.split("___")[1],
        instanceManipulation    : new ContentManipulation(),
        hideContent             : [],
        showContent             : [],
        setValue                : [],
        setText                 : []
    }
    
    if (infosSwitch.checkedSwitch) {
        
        infosSwitch.setValue.push(
            {
                field : `hd_grupo_user___${infosSwitch.index}`,
                value : "sim"
            }
        )

        infosSwitch.hideContent.push(`div_userAtv___${infosSwitch.index}`)
        infosSwitch.showContent.push(`div_groupAtv___${infosSwitch.index}`)
        
        infosSwitch.setText.push(
            {
                field : `label_user_name___${infosSwitch.index}`,
                value : "Grupo a receber a tarefa"
            }
        )

        $(`#fl_grupo___${infosSwitch.index}`).addClass("cp_obrigatorio")
        $(`#fl_usuario___${infosSwitch.index}`).removeClass("cp_obrigatorio")

    } else {
        infosSwitch.setValue.push(
            {
                field : `hd_grupo_user___${infosSwitch.index}`,
                value : "nao"
            }
        )

        infosSwitch.showContent.push(`div_userAtv___${infosSwitch.index}`)
        infosSwitch.hideContent.push(`div_groupAtv___${infosSwitch.index}`)
        
        infosSwitch.setText.push(
            {
                field : `label_user_name___${infosSwitch.index}`,
                value : "Usuário a receber a tarefa"
            }
        )

        $(`#fl_grupo___${infosSwitch.index}`).removeClass("cp_obrigatorio")
        $(`#fl_usuario___${infosSwitch.index}`).addClass("cp_obrigatorio")
    }

    infosSwitch.setValue.forEach(value => infosSwitch.instanceManipulation.setValue(value.field, value.value))
    infosSwitch.hideContent.forEach(content => infosSwitch.instanceManipulation.hideContent(content))
    infosSwitch.showContent.forEach(content => infosSwitch.instanceManipulation.showContent(content))
    infosSwitch.setText.forEach(value => infosSwitch.instanceManipulation.setText(value.field, value.value))
}

/* Função que altera o switch de busca, alterando a visualização dos campos */
function switchGroupUserSearch(switchValue){
    const instanceManipulation = new ContentManipulation()
    if (switchValue.checked) {
        const fieldSwitchSearch = {
                field : `hd_grupo_user_search`,
                value : "sim"
        }

        instanceManipulation.showContent("groupUser")
        instanceManipulation.hideContent("searchUser")
        instanceManipulation.setValue(fieldSwitchSearch.field, fieldSwitchSearch.value)
        instanceManipulation.setText("label_user_search", "Grupo a receber a tarefa")

    }else{
        const fieldSwitchSearch = {
                field : `hd_grupo_user_search`,
                value : "nao"
        }
        
        instanceManipulation.hideContent("groupUser")
        instanceManipulation.showContent("searchUser")
        instanceManipulation.setValue(fieldSwitchSearch.field, fieldSwitchSearch.value)
        instanceManipulation.setText("label_user_search", "Usuário a receber a tarefa")
    }
}

/* Função que realiza a operação de salvar um registro de formulário no GED */

/**
 * 
 * Por favor, alterar as informações do @parentDocumentId encontrado na função de save, 
 * após criado o formulário em produção, adicionar seu Id para receber os registros
 * 
 */

function saveGed(){
    
    const instances = {
        ged     : new Ged(),
        html    : new ContentManipulation(),
        dataset : new Dataset()
    }
    const inputsSave = $("input[id^='id_processo___']")

    /* Valida os campos obrigatórios */
    if (campoObrigatorio()) {

        /* Percorre as linhas adicionadas para cadastro */
        inputsSave.each((i, element) => {

            const index = element.id.split("___")[1] /* Busca o ___{1} */
            
            const infosSaveGed = {
                idProcessoEAtividade    : instances.html.getValue(`id_processo___${index}`),
                grupoOuUser             : instances.html.getValue(`hd_grupo_user___${index}`),
                usuario                 : instances.html.getValue(`fl_usuario___${index}`),
                grupo                   : instances.html.getValue(`fl_grupo___${index}`),
                descAtividade           : instances.html.getValue(`desc_atividade___${index}`),
                codUserAtribuicao       : instances.html.getValue(`hd_cod_user___${index}`)
            }
            
            const formData = {
                "parentDocumentId": 20352, // código do formulario que receberá a informação
                "version": 1000, //versão do formulário
                "inheritSecurity": true, // Consta que ele herda a segurança do pai
                "formData": [ 
                    {
                        "name": "txt_iden_atividade",
                        "value": infosSaveGed.idProcessoEAtividade
                    },                   
                    {
                        "name": "txt_desc_atv",
                        "value": infosSaveGed.descAtividade
                    },
                ]
            }

            /* valida se é um grupo */
            if (infosSaveGed.grupoOuUser == "sim") { 
                formData.formData.push(
                    {
                        "name": "txt_atri_atividade",
                        "value": infosSaveGed.grupo
                    },
                    {
                        "name": "hd_cod_user_atv",
                        "value": "Pool:Group:" + infosSaveGed.grupo
                    },
                    {
                        "name": "hd_tipo_atribuicao",
                        "value": "grupo"
                    }
                )
            }else{
                formData.formData.push(
                    {
                        "name": "txt_atri_atividade",
                        "value": infosSaveGed.usuario
                    },
                    {
                        "name": "hd_cod_user_atv",
                        "value": infosSaveGed.codUserAtribuicao
                    },
                    {
                        "name": "hd_tipo_atribuicao",
                        "value": "usuario"
                    }
                )
            }
            
            const deleteDocument = instances.html.getValue("hd_cod_documento")

            deleteDocument != "" ? instances.ged.delete(deleteDocument) : ""

            const paramsConstraint = [
                {
                    fieldName : "ID_ATV",
                    initialValue : infosSaveGed.idProcessoEAtividade,
                    finalValue : infosSaveGed.idProcessoEAtividade,
                    constraintType: ConstraintType.MUST
                }
            ]
            const validateAtribuConstraint  = instances.dataset.createConstraint(paramsConstraint)
            
            const paramsDataset = {
                datasetName : genericInfos.datasetName,
                constraints : validateAtribuConstraint
            }
            
            const getDatasetAtribuicoes     = instances.dataset.getDataset(paramsDataset)

            if (getDatasetAtribuicoes.length == 0) {
                instances.ged.save(JSON.stringify(formData))
            }else{
                FLUIGC.toast({
                    title: 'Erro ao salvar atribuição <br>',
                    message: 'Atribuição com o ID ' + infosSaveGed.idProcessoEAtividade + ' já cadastrado. Cadastre o mesmo com outro identificador único!' ,
                    type: 'danger'
                });
            }

            
        })
        $('#bodyTableAtribuicoes').html('')
    }
}

/* Função que realiza a exclusão do registro */
function deletaRegistro(registro) {
    const idDocs = registro.parentNode.parentNode.children[0].children[0].innerHTML;
    $("#hd_cod_docs_exclui").val(idDocs)
    
    FLUIGC.modal({
        title: 'Exclusão',
        content: '<p>Você tem certeza que deseja excluir este registro?</p>',
        id: 'modal_exclusão',
        size: 'large',
        actions: [{
            'label': 'Sim',
            'bind': 'data-sim-req',
            'classType': 'btn btn-danger btn-block',
            'autoClose': true
        }, {
            'label': 'Não',
            'bind': 'data-nao-req',
            'classType': 'btn btn-primary btn-block',
            'autoClose': true
        }]
    }, function (err, data) {
        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });

    $("button[data-sim-req]").on('click', function () {
        const docsID = $("#hd_cod_docs_exclui").val()
        const instance = new Ged()

        instance.delete(docsID)
    });
}

/* Função que realiza a busca das informações do painel de pesquisa */
function searchAtribuicao(){
    const instanceContent = new ContentManipulation();
    const instanceDataset = new Dataset()
    
    const infosSearch = {
        idProcesso  : instanceContent.getValue("txt_buscaId_processo"),
        grupoOuUser : instanceContent.getValue("hd_grupo_user_search"),
        matUser     : instanceContent.getValue("hd_matricula_user"),
        groupId     : instanceContent.getValue("txt_grupo_tarefa")
    }

    let paramsConstraintSearch = []
    

    if (infosSearch.idProcesso != "") {
        paramsConstraintSearch.push(
            {
                fieldName : "LIKE_ATRIBUICAO",
                initialValue : infosSearch.idProcesso,
                finalValue : infosSearch.idProcesso,
                constraintType: ConstraintType.MUST
            }
        )
    }

    if (infosSearch.grupoOuUser == "sim") {
        if (infosSearch.groupId != "") {
            paramsConstraintSearch.push(
                {
                    fieldName : "LIKE_GROUPID",
                    initialValue : infosSearch.groupId,
                    finalValue : infosSearch.groupId,
                    constraintType: ConstraintType.MUST
                }   
            )
        }
    }else{
        if (infosSearch.matUser != "") {
            paramsConstraintSearch.push(
                {
                    fieldName : "LIKE_MATRICULA",
                    initialValue : infosSearch.matUser,
                    finalValue : infosSearch.matUser,
                    constraintType: ConstraintType.MUST
                }
            )
        }
    }

    if (paramsConstraintSearch.length > 0) {
        const constraints = instanceDataset.createConstraint(paramsConstraintSearch)

        const paramsDataset = {
            datasetName : genericInfos.datasetName,
            constraints : constraints
        }

        const datasetAtributos = instanceDataset.getDataset(paramsDataset)

        datasetAtributos.length > 0 ? criaTable(datasetAtributos) :  FLUIGC.toast({
            title: 'Filtro inválido <br>',
            message: 'Filtro selecionado não encontrado.' ,
            type: 'danger'
        });

    }else{
        getCadastroAtribuicoes()    
    }

}

/* Função que realiza a validação dos campos obrigatórios para integração */
const campoObrigatorio = () => {
    let campo_obr_preenchido = true;
    if (campo_obr_preenchido) {
        $('.cp_obrigatorio').each(function (e) {
            if ($(this).is(':visible')) {
                if (this.type == 'text') {
                    if (this.value.trim() == "") {
                        FLUIGC.toast({
                            title: 'Campo obrigatório vazio! <br>',
                            message: 'Campo ' + $('label[for="' + this.name + '"]').text() + ' está vazio',
                            type: 'danger'
                        });
                        campo_obr_preenchido = false;
                        return false;
                    }
                }
            }
            else {
                if (this.value == '0' || this.value == '') {
                    FLUIGC.toast({
                        title: 'Campo obrigatório vazio! <br>',
                        message: 'Campo ' + $('label[for="' + this.name + '"]').text() + ' está vazio',
                        type: 'danger'
                    });
                    campo_obr_preenchido = false;
                    return false;
                }
            }
        })
    }

    return campo_obr_preenchido;
}

/* ========== CLASSES CRIADAS ========== */
/* 
    Abaixo se encontra as classes desenvolvidas 
    para que possamos reaproveitar código de uma 
    maneira mais simples e fácil de compreender

    Desenvolvido by Jean Carlos
    Se tiver dúvidas, dê um salve no linkedin: https://www.linkedin.com/in/jean-carlos-lopes
*/
class Ged {
    
    /*
    
        Classe que obtém o método de salvar e deletar um registro de formulário no GED
    
        No método save, recebe a estrutura do formData, sendo ele:
        formData = {
            "parentDocumentId": 1767533, // código do formulario que receberá a informação
            "version": 1000, //versão do formulário
            "inheritSecurity": true, // Consta que ele herda a segurança do pai
            "formData": [ 
                {
                    "name": "campo que receberá a informação",
                    "value": "valor que será inserido"
                }
            ]
        }
        O formData deve ser enviado como stringify
    
        No método delete, recebe apenas o Id do documento que será excluído
    
    */
    constructor() { }

    save(formData) {
        $.ajax({
            async: false,
            url: '/api/public/2.0/cards/create',
            type: "POST",
            contentType: "application/json",
            Accept: "text/html",
            data: formData,
            success: function (data) {
                console.log(data);
                
                FLUIGC.toast({
                    title: 'Cadastro de Categoria: <br>',
                    message: 'Realizado com sucesso',
                    type: 'success'
                });
                getCadastroAtribuicoes()
            },
            error: function (data, errorThrown, status) {
                console.log('Deu erro!')
            }
        });
    }

    delete(documentId) {
        $.ajax({
            async: false,
            url: "/api/public/2.0/cardindexes/delete/" + documentId,
            method: "POST",
            timeout: 0,
            headers: {
                "Content-Type": "application/json"
            },
            success: function (data) {
                
                console.log(data);
                console.log('Excluído com sucesso')
                $('#hd_cod_documento').val('')
                getCadastroAtribuicoes()
            },
            error: function (data, errorThrown, status) {
                console.log('Deu erro!')
                $('#hd_cod_documento').val('')
            }
        });
    }
}

class actionsTable {
    /*

        Classe que comporta as ações da tabela PaixFilho de cadastro, sendo ela:

        seu constructor recebe o index e os valores para edição

        add -> Retorna uma estrutura pré-definida da tabela, para que possamos adicionar na estrutura da widget, 
        sendo cada linha para cadastro. Ele utiliza apenas o this.index para criar indices dinâmicos

        edit -> Retorna uma estrutura pré-definida da tabela, para que possamos editar as informações já cadastradas.
        Ele utiliza tanto o this.index para criação dos indices dinâmicos, quanto os valores para edição;

    */
    constructor(valueIndex, editValues) {
        this.index = valueIndex
        this.objEdit = editValues
    }

    add() {
        const cols = `
            <div class="col-md-12" style="margin-top: 25px;display: flex; flex-direction: column;">
                <div class="row">
                    <div class="col-md-1"></div>
                    
                    <div class="col-md-3">
                        <label>ID do processo e atividade</label>
                    </div>
                    
                    <div class="col-md-2">
                        <label>É um grupo?</label>
                    </div>
                    
                    <div class="col-md-3">
                        <label id="label_user_name___${this.index}">Usuário a receber a tarefa</label>
                    </div>
                    
                    <div class="col-md-3">
                        <label>Descrição da atividade</label>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-1">
                        <div id="delet_row___${this.index}_tb" onclick="deleteTabela(this)">
                            <span class="fluigicon fluigicon-trash fluigicon-md"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <input class="cp_obrigatorio form-control" type="text" id="id_processo___${this.index}" name="id_processo___${this.index}" >
                    </div>
                    <div class="col-md-2">
                        <input class="cp_obrigatorio input" type="checkbox" data-on-color="success" data-on-text="Sim" data-off-text="Não" id="sw_grupo_user___${this.index}" name="sw_grupo_user___${this.index}" onchange="setSwitchGroupOrUser(this)">
                        <input type="hidden" id="hd_grupo_user___${this.index}" name="hd_grupo_user___${this.index}">
                    </div>
                    <div class="col-md-3">
                        <div id="div_userAtv___${this.index}">
                            <input class="form-control input cp_obrigatorio" type="text" id="fl_usuario___${this.index}" name="fl_usuario___${this.index}">
                            <input type="hidden" id="hd_cod_user___${this.index}" name="hd_cod_user___${this.index}">
                        </div>
                        
                        <div id="div_groupAtv___${this.index}" style="display: none;">
                            <input class="form-control input" type="text" id="fl_grupo___${this.index}" name="fl_grupo___${this.index}">
                        </div>
                        
                    </div>
                    <div class="col-md-3">
                        <input class="cp_obrigatorio form-control input" type="text" id="desc_atividade___${this.index}" name="desc_atividade___${this.index}">
                    </div>
                </div>
            </div>        
        `
        return cols
    }

    edit() {
        const cols = `
            <div class="col-md-12" style="margin-top: 25px;display: flex; flex-direction: column;">
                <div class="row">
                    <div class="col-md-1"></div>
                    
                    <div class="col-md-3">
                        <label>ID do processo e atividade</label>
                    </div>
                    
                    <div class="col-md-2">
                        <label>É um grupo?</label>
                    </div>
                    
                    <div class="col-md-3">
                        <label id="label_user_name___${this.index}">Usuário a receber a tarefa</label>
                    </div>
                    
                    <div class="col-md-3">
                        <label>Descrição da atividade</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <div id="delet_row___${this.index}_tb" onclick="deleteTabela(this)">
                            <span class="fluigicon fluigicon-trash fluigicon-md"></span>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <input class="cp_obrigatorio form-control" type="text" id="id_processo___${this.index}" name="id_processo___${this.index}" value="${this.objEdit.idProcesso}" readonly>
                    </div>
                    <div class="col-md-2">
                        <input class="cp_obrigatorio form-control input" type="checkbox" data-on-color="success" data-on-text="Sim" data-off-text="Não" id="sw_grupo_user___${this.index}"  name="sw_grupo_user___${this.index}" onchange="setSwitchGroupOrUser(this)">
                        <input type="hidden" id="hd_grupo_user___${this.index}" name="hd_grupo_user___${this.index}">
                    </div>
                    <div class="col-md-3">
                        <div id="div_userAtv___${this.index}">
                            <input class="form-control input" type="text" id="fl_usuario___${this.index}" name="fl_usuario___${this.index}">
                            <input type="hidden" id="hd_cod_user___${this.index}" name="hd_cod_user___${this.index}">
                        </div>
                        
                        <div id="div_groupAtv___${this.index}" style="display: none;">
                            <input class="form-control input" type="text" id="fl_grupo___${this.index}" name="fl_grupo___${this.index}">
                        </div>
                        
                    </div>
                    <div class="col-md-3">
                        <input class="cp_obrigatorio form-control input" type="text" id="desc_atividade___${this.index}" name="desc_atividade___${this.index}" value="${this.objEdit.descAtividade}">
                    </div>
                </div>
        </div>`

        return cols;
    }
}

class Dataset {
    /* 
    
        Classe que realizam a criação de contraints e de datasets

        createConstraint -> método gera as constraints, deve ser enviado a seguinte estrutura:
        const arrObjeto = [
            {
                fieldName : "COLUNAFILTRAVEL",
                initialValue : "teste",
                finalValue : "teste",
                constraintType: ConstraintType.MUST
            }
        ]
        
        getDataset -> método que retorna os valores de um dataset. Deve ser enviado a seguinte estrutura:
        const arrObjeto = {
                datasetName : "dsNomeDataset", -> Obrigatório
                fields      : opcional,
                constraints : opcional,
                order       : opcional,
        }
        
        Os valores opcionais podem não ser enviados, que o próprio método já realiza a tratativa.

    */
    constructor() { }

    createConstraint(paramsConstraint) {
        let constraint = []
        for (let index = 0; index < paramsConstraint.length; index++) {
            constraint.push(DatasetFactory.createConstraint(
                paramsConstraint[index].fieldName,
                paramsConstraint[index].initialValue, paramsConstraint[index].finalValue,
                paramsConstraint[index].constraintType))
        }

        return constraint
    }

    getDataset(paramsDataset) {
        let datasetName = paramsDataset.datasetName
        let fields = paramsDataset.fields
        let constraints = paramsDataset.constraints
        let order = paramsDataset.order

        fields != null ? fields = fields : fields = null
        constraints != null ? constraints = constraints : constraints = null
        order != null ? order = order : order = null

        let getDataset = DatasetFactory.getDataset(datasetName, fields, constraints, order)

        return getDataset.values
    }
}

class Filter{
    /* 
    
        Classe que realiza a criação de um campo filter
        Ela recebe a seguinte estrutura:
        {
            instanceFilter  : "userTarefa", --> nome do atributo em que adicionarei a manipulação do meu filter
            infos           : { --> Essa é a configuração do meu filter, envio sempre de forma dinâmica as infos.
                datasetValues   : datasetValue, --> esse é o source, aqui enviamos os valores do dataset que iremos carregar no filter
                displayKey      : "colleagueName", --> nome do displayKey 
                titleHeader     : 'Usuário', --> título
                dataorder       : 'colleagueName', --> Ordenação
                renderContent   : ["colleagueName"], --> Renderização
                fieldForm       : `#fl_usuario___${genericInfos.indexTable}` --> campo que será renderizado o filter
            } 
        }
    */
   
    constructor(){
    }
    
    createFilter(params_filter, instanceFilter){
        const instance = new ContentManipulation()
        
        const filter = {
            source: params_filter.datasetValues,
            displayKey: params_filter.displayKey,
            style: {
                autocompleteTagClass: 'tag-info',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: params_filter.header,
                renderContent: params_filter.renderContent //tem que ser um array
            }
        };
        
        /* Inicializa o filter e atribui a sua variável a informação correta */
        genericInfos.filters[instanceFilter] == null ? genericInfos.filters[instanceFilter] = FLUIGC.filter(params_filter.fieldForm, filter) : genericInfos.filters[instanceFilter].reload(filter)

        /* Função interna do filter que executa quando um dos objetos genéricos enviados como parâmetro recebe a seleção de um conteúdo */
        genericInfos.filters[instanceFilter].on('fluig.filter.item.added', function (data) { 
            console.log(data)

            switch (instanceFilter) {
                case "userTarefa":
                    const field = data.target.id
                    const index = field.split("___")[1]
                    field == `fl_usuario___${index}` ? instance.setValue(`hd_cod_user___${index}`, data.item['colleaguePK.colleagueId']) : instance.setValue(`hd_cod_user___${index}`, "")
                    break;
                case "userSearch":
                    const colleagueId = data.item['colleaguePK.colleagueId']
                    instance.setValue("hd_matricula_user", colleagueId)
                    break;
                default:
                    break;
            }
            
        })
        
        genericInfos.filters[instanceFilter].on('fluig.filter.itemRemoved', function (data) { 
            console.log(data)

            switch (instanceFilter) {
                case "userTarefa":
                    const field = data.target.id
                    const index = field.split("___")[1]
                    field == `fl_usuario___${index}` ? instance.setValue(`hd_cod_user___${index}`, "") : instance.setValue(`hd_cod_user___${index}`, "")
                    break;
                case "userSearch":
                    instance.setValue("hd_matricula_user", "")
                    break;
                default:
                    break;
            }
            
        })

    }
}

class ContentManipulation {
    /*
        Classe que obtém métodos onde os conteúdos do DOM são manipulados via jQuery

        hideContent --> Esconde conteúdo
        showContent --> Apresenta conteúdo
        setValue    --> Seta um valor em um campo
        getValue    --> Busca um valor de um campo
        setText     --> Adiciona um texto em uma div
    */
    constructor() { }

    hideContent = idField =>  $('#' + idField).hide("smooth")

    showContent = idField => $('#' + idField).show("smooth")
    
    getValue = field => $("#" + field).val()
    
    setValue = (id, value) => $('#' + id).val(value)


    setText = (id, text) => $(`#${id}`).text(text)
}



/*


    === Script que busca a atribuição do usuário através do processo e da atividade ===

    Função para index.js
    function getAtribuicoes(atribuicao){
    
        var constraintAtribuicao = DatasetFactory.createConstraint("ID_ATV", atribuicao, atribuicao, ConstraintType.MUST)
        var dtsAtribuicoes = DatasetFactory.getDataset("ds_consultaCadastroAtribuicoes", null, [constraintAtribuicao], null).values

        if (dtsAtribuicoes.length > 0) {
            return dtsAtribuicoes[0].hd_cod_user_atv
        } else {
            return ""
        }
    
    }


    Função para displayFields

    function getAtribuicoes(atribuicao){
    
        var constraintAtribuicao = DatasetFactory.createConstraint("ID_ATV", atribuicao, atribuicao, ConstraintType.MUST)
        var dtsAtribuicoes = DatasetFactory.getDataset("ds_consultaCadastroAtribuicoes", null, [constraintAtribuicao], null)

        if (dtsAtribuicoes.rowsCount > 0) {
            return dtsAtribuicoes.getValue(0, "hd_cod_user_atv")
        } 
        
        return ""
    }

*/