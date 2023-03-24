class Info{
    constructor(name, valueStr, value, action, additional, image, ref, databaseID) {
        this.name = name
        this.valueStr = valueStr
        this.value = value
        this.action = action
        this.additional = additional
        this.image = image
        this.ref = ref
        this.databaseID = databaseID
    }
}

let fetchedInfo = []

function fetchInfo(infoArr){
    let r = 0
    do {
        r = Math.round(Math.random() * 23)
    } while (fetchedInfo.includes(r))
    fetchedInfo.push(r)
    return (
        new Info( 
            infoArr[r].name, 
            infoArr[r].value,
            parseFloat((infoArr[r].value).replace(/,/g, '')),
            infoArr[r].action,
            infoArr[r].additional,
            infoArr[r].image,
            infoArr[r].ref, 
            infoArr[r].databaseID
        )
    )
}

export {fetchedInfo, fetchInfo}