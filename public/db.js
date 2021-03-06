let db
const dbReq = indexedDB.open("budget", 1)

dbReq.onupgradeneeded = (event) => {
   
    const db = event.target.result

    db.createObjectStore("pending", { autoIncrement: true })

}

dbReq.onsuccess = (event) => {

    db = event.target.result

    if (navigator.onLine) {
        checkDatabase()
    }
   
}


dbReq.onerror = (event) => {
    
    alert("cannot open database: " + event.target.errorCode)

}


function saveRecord(record) {
    
    const transaction = db.transaction(["pending"], "readwrite")

    const store = transaction.objectStore("pending")

    store.add(record)

}

function checkDatabase() {
    
    const transaction = db.transaction(["pending"], "readwrite")
    
    const store = transaction.objectStore("pending")
    
    const getAll = store.getAll()

    getAll.onsuccess = function() {

        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(() => {

                const transaction = db.transaction(["pending"], "readwrite")

                const store = transaction.objectStore("pending")

                store.clear()

            })
        }
    }
}

window.addEventListener("online", checkDatabase())







