<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<script src="/portal/resources/js/mustache/mustache-min.js"></script>

<div id="ExportaProcessoG3_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="ExportaProcessoG3.instance()">
	<!-- Filtros -->
	<div class="row">
		<div class='col-md-12'>
			<div class="alert alert-info" role="alert"><strong>Aviso:</strong> se a data de início da solicitação não for definida, será utilizado como filtro padrão os últimos 30 dias.</div>
		</div>
	</div>
	<div class="row">
		<div class='col-md-3'>
			<div class='form-group'>
				<label for='START_DATE_INI_${instanceId}'>Data da solicitação (Início)</label>
				<input type='text' class='form-control calendar' id='START_DATE_INI_${instanceId}' name='START_DATE_INI_${instanceId}' onblur="verifyInputDateG3(this, 'solicitacao')" />
			</div>
		</div>
		<div class='col-md-3'>
			<div class='form-group'>
				<label for='START_DATE_FIM_${instanceId}'>Data da solicitação (Fim)</label>
				<input type='text' class='form-control calendar' id='START_DATE_FIM_${instanceId}' name='START_DATE_FIM_${instanceId}' onblur="verifyInputDateG3(this, 'solicitacao')" />
			</div>
		</div>
		<div class='col-md-3'>
			<div class='form-group'>
				<label for='NUM_PROCES_${instanceId}'>Id. Fluig</label>
				<input type='text' class='form-control' id='NUM_PROCES_${instanceId}' name='NUM_PROCES_${instanceId}' />
			</div>
		</div>
	</div>
	<div class="row">
		<div class='col-md-3'>
			<div class='form-group'>
				<label for='idMov_${instanceId}'>Id. Mov</label>
				<input type='text' class='form-control' id='idMov_${instanceId}' name='idMov_${instanceId}' />
			</div>
		</div>
		<div class='col-md-3'>
			<div class='form-group'>
				<label for='centroCusto_${instanceId}'>Centro de Custo</label>
				<input type='text' class='form-control' id='centroCusto_${instanceId}' name='centroCusto_${instanceId}' />
			</div>
		</div>
		<div class='col-md-3'>
			<div class='form-group'>
				<label for='numOs_${instanceId}'>Nº da OS</label>
				<input type='text' class='form-control' id='numOs_${instanceId}' name='numOs_${instanceId}' />
			</div>
		</div>
	</div>
	<div class="row">
		<div class='col-md-3'>
			<div class='form-group'>
				<label for='produto_${instanceId}'>Produto</label>
				<input type='text' class='form-control' id='produto_${instanceId}' name='produto_${instanceId}' />
			</div>
		</div>
		<div class='col-md-3'>
			<div class='form-group'>
				<label for='status_${instanceId}'>Status da Aprovação</label>
				<select class='form-control' id='status_${instanceId}' name='status_${instanceId}'>
					<option value="">Selecione uma opção</option>
					<!-- <option value="23">Gestor de Compras</option> -->
					<option value="66">Aprovado pelo Gestor de compras</option>
					<option value="2">Aprovado pela Estoque</option>
					<option value="4">Aprovado pela Engenharia</option>
					<option value="10">Aprovado pela Diretoria</option>
				</select>
			</div>
		</div>
		<div class='col-md-3'>
			<div class='form-group'>
				<label for='limite_${instanceId}'>Número máximo de resultado</label>
				<input type='number' class='form-control' id='limite_${instanceId}' name='limite_${instanceId}' value="50" />
			</div>
		</div>
	</div>
	<!-- Botões -->
	<div class="row">
		<div class='col-md-3'>
			<div class='form-group'>
				<button class="btn btn-info" data-load-table> Carregar tabela </button>
			</div>
		</div>
		<div class='col-md-3'>
			<div class='form-group'>
				<button class="btn btn-success" data-exportar-processos> Exportar Resultados </button>
			</div>
		</div>
	</div>

	<!-- Tabela -->
	<div id="mypanel_${instanceId}"></div>
</div>

<script type="text/template" class="template_datatable_${instanceId}">
	{{#values}}
		<div class="row">'
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<h3 class="card-title">Solicitação {{NUM_PROCES}}</h3>
						<h6 class="card-subtitle mb-2 text-muted">Status: <span class="{{CORSTATUS}}">{{STATUS}}</span></h6>
						<div class="card-text">
							<div class="row">
								<div class="col-md-4"> <span style="font-weight: 800;">Status da Aprovação: </span>{{DES_ESTADO}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Data da Aprovação: </span>{{DATA_DE_APROVAO}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Data da Emissão: </span>{{dataEmissao}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Tipo de Movimento: </span>{{tipoMovimento}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Id. Fluig (G3): </span>{{NUM_PROCES}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Id. Mov: </span>{{idMov}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Núm. Mov: </span>{{numeroMov}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Local do Estoque: </span>{{localEstoque}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Centro de Custo: </span>{{centroCusto}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Fornecedor: </span>{{fornecedor}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Valor Liquido: </span>{{valorLiquido}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Cod. Pagamento: </span>{{codPagamento}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Histórico: </span>{{historico}}</div>
								<div class="col-md-4"> <span style="font-weight: 800;">Num OS: </span>{{numOs}}</div>
								<div class="col-md-12"> <span style="font-weight: 800;">Descrição: </span>{{CONCATENATED_VALUES}}</div>
							</div>
						</div>
						<a class="card-link" style="text-decoration: underline;" href="/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID={{NUM_PROCES}}" target="_black">Visualizar detalhes solicitação</a>
					</div>
				</div>
			</div> 
		</div>
	{{/values}}
</script>