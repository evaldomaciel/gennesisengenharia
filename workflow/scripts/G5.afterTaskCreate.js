function afterTaskCreate(colleagueId){
	log.dir({
		'afterTaskCreate': 'inicio',
		'WKNumProces': getValue("WKNumProces"),
		'WKNumState': getValue("WKNumState"),
		'WKNextState': getValue("WKNextState")
	  })
}
