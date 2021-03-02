let db
let dbReq = indexedDB.open("budgetDB", 1)

dbReq.onupgradeneeded = (event) => {
    db = event.target.result

    let budget = db.createObjectStore("budget", {autoIncrement: true})
}

dbReq.onsuccess = (event) => {
    db = event.target.result

 
}

dbReq.onerror = (event) => {
    alert("cannot open database " + event.target.errorCode)
}