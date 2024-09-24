<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"  data-params="MyWidget.instance()">
    <div class="fluig-style-guide" style="font-family: 'Poppins', sans-serif !important; ">
    
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

        <form>
            <input type='hidden' id='hd_cod_documento' name='hd_cod_documento'>
            <input type='hidden' id='hd_cod_docs_exclui' name='hd_cod_docs_exclui'>
            <div class="panel panel-default">
                <div class="panel-heading new-panel">
			        <div class='content-title'>
                        <h2 class="panel-title" style="font-size: 1.4rem;"> 
                            <i style="color: #969696;" class="flaticon flaticon-document-approved icon-md" aria-hidden="true"></i>
                            Cadastro de Atribuições
                        </h2>
                    </div>
                </div>
                <div class="panel-body">
                    
					<div id="bodyTableAtribuicoes"></div>
                    <div class='row'>
                        <div class='col-md-12' style='margin-top: 25px; display: flex; justify-content: end;'>
                            <button id='btn-filtro' type='button' class='btn-busca' onclick='addNewRow()'>Novo</button>
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col-md-12' style='margin-top: 25px; display: flex; justify-content: center;'>
                            <button id='btn-save' type='button' class='btn-salva' onclick='saveGed()'>Salvar</button>
                        </div>
                    </div>

                    <div class='painel-pesquisa' style='margin: 60px 0;'>
                        <div class='row'>
                            <div class='new-panel panel-heading'>
                                <h2 class='panel-title' style='font-size: 1.4rem'><i class="flaticon flaticon-search icon-md" style="color: #969696;" aria-hidden="true"></i> Filtro Atribuições</h2>
                            </div>
                        </div>
                        <div class='row' style='margin: 30px 0;'>
                            <div class="col-md-3">
                                <label>ID do processo e atividade</label>
                                <input type="text" class='form-control' id='txt_buscaId_processo' name='txt_buscaId_processo'>
                            </div>
                            
                            <div class="col-md-2" style="display: flex;flex-direction: column;">
                                <label>É um grupo?</label>
                                <input type="checkbox" class='form-control' data-on-color="success" data-on-text="Sim" data-off-text="Não" id='sw_grupo_ou_user' name='sw_grupo_ou_user' onchange="switchGroupUserSearch(this)">
                                <input type="hidden" class='form-control' id='hd_grupo_user_search' name='hd_grupo_user_search'>

                            </div>
                            
                            <div class="col-md-3">
                                <label id="label_user_search">Usuário a receber a tarefa</label>
                                <div id="searchUser">
                                    <input type="text" class='form-control' id='txt_usuario_tarefa' name='txt_usuario_tarefa'>
                                    <input type="hidden" id='hd_matricula_user' name='hd_matricula_user'>
                                </div>
                                <div id="groupUser" style="display: none;">
                                    <input type="text" class='form-control' id='txt_grupo_tarefa' name='txt_grupo_tarefa'>
                                </div>
                            </div>
                            
                            <div class='col-md-4'>
                                <br>
                                <button id='btn-filtro' style='width: 100%;' type='button' class='btn-busca' onclick='searchAtribuicao()'>Buscar</button>
                            </div>
                        </div>
                    </div>

                    <div class='row'>
                        <div>
                            <div class="row" style="padding: 0 15px;">
                            
                                <div class="content-line col-md-1"> 
                                    <label>ID Doc.</label>
                                </div>
                                <div class="content-line col-md-3"> 
                                    <label>ID do processo e atividade</label>
                                </div>
                                <div class="content-line col-md-3"> 
                                    <label>Usuário a receber a tarefa</label>
                                </div>
                                <div class="content-line col-md-3"> 
                                    <label>Descrição da atividade</label>
                                </div>
                                <div class="content-button col-md-2">
                                    <label>Ação</label>
                                </div>
                            </div>
                            <div id="atribuicoes"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </form>
    </div>
</div>

