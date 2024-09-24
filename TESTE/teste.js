var constraintProcessState1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
var constraintProcessState2 = DatasetFactory.createConstraint('processStatePK.processId', 'G5', 'G5', ConstraintType.MUST);
var constraintProcessState3 = DatasetFactory.createConstraint('processStatePK.version', '1', '1', ConstraintType.MUST);
var colunasProcessState = new Array('processStatePK.sequence', 'processStatePK.processId', 'processStatePK.version', 'stateName', 'stateDescription', 'bpmnType');
var datasetProcessState = DatasetFactory.getDataset('processState', colunasProcessState, new Array(constraintProcessState1, constraintProcessState2, constraintProcessState3), null);
