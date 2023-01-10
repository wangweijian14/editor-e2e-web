let server = "http://124.223.27.10:8000"
let ELEMENT_API_LIST = server + "/element/list"
let ELEMENT_API_UPDATE = server +  "/element/update"
let ELEMENT_API_CREATE = server +  "/element/create"
let ELEMENT_API_REMOVE = server +  "/element/remove"
let PAGE_API_LIST = server +  "/page/list"
let PAGE_API_TREE = server +  "/page/tree"
let PAGE_API_UPDATE = server +  "/page/update"
let PAGE_API_CREATE = server +  "/page/create"
let STEP_API_LIST = server +  "/step/list"
let STEP_API_UPDATE = server +  "/step/update"
let STEP_API_CREATE = server +  "/step/create"
let STEP_API_REMOVE = server +  "/step/remove"
let CASE_STEP_API_LIST = server +  "/case-step/list"
let CASE_STEP_UPDATE = server +  "/case-step/update"
let CASE_STEP_REMOVE = server +  "/case-step/remove"
let CASE_STEP_API_CREATE = server +  "/case-step/create"
let CASE_STEP_DEBUG = server +  "/case/step-test"
let CASE_STEP_API_ONE = server +  "/case-step/get-one"
let CASE_API_EXECUTE = server +  "/case/execute"
let CASE_API_LIST = server +  "/case/list"
let CASE_API_CREATE = server +  "/case/create"
let CASE_API_UPDATE = server +  "/case/update"
let CASE_API_ONE =  server + "/case/get-one"
let BROWSER_OPEN_URL =  server + "/case/page-open"
let BROWSER_OPEN_URL_BYID = server +  "/case/page-open-id"
let CASEREPORT_API_LIST = server + "/report/list"
let CASEREPORT_API_ONE = server + "/report/get-one"
let ACTION_PATH = "/admin/data/action.json"
let MONITOR_PAGES = server + "/monitor/pages"
let MONITOR_PAGEONE = server + "/monitor/page/one"
let MONITOR_PAGESCREENSHOT = server + "/monitor/screenshot"

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// Example POST method implementation:
async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        // headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function getPageSelector($,path,form,select){
    getData(PAGE_API_LIST,)
        .then(data => {
            let row =  data.data.row
            for(let i =0;i<row.length;i++){
                if (select && select === data[i].id){
                    $(path).append("<option selected value=\""+row[i].id+"\">"+row[i].name+"</option>");
                }else {
                    $(path).append("<option value=\""+row[i].id+"\">"+row[i].name+"</option>");
                }

            }
            form.render("select");
        }).catch((error) => {
            console.log(error)
    });
}

function getActionSelector($,path,form,select){
    getData(ACTION_PATH,)
        .then(data => {
            for(let i =0;i<data.length;i++){
                if (select && select === data[i].id){
                    $(path).append("<option  selected value=\""+data[i].id+"\">"+data[i].name+"</option>");
                }else {
                    $(path).append("<option value=\""+data[i].id+"\">"+data[i].name+"</option>");
                }

                form.render("select");
            }
        }).catch((error) => {
        console.log(error)
    });
}


function getElementSelector($,path,form,elementId,select){
    getData(ELEMENT_API_LIST+'?pageId='+elementId,)
        .then(data => {
            let row =  data.data.row
            for(let i =0;i<row.length;i++){
                if (select && select === row[i].id){
                    $(path).append("<option selected value=\""+row[i].id+"\">"+row[i].name+"</option>");
                }else {
                    $(path).append("<option value=\""+row[i].id+"\">"+row[i].name+"</option>");
                }

            }
            form.render("select");
        }).catch((error) => {
        console.log(error)
    });
}

function getStepSelector($,path,form,elementId,select){
    console.log(elementId)
    let  reqPath 
    if (elementId === "" ||  typeof elementId === 'undefined'){
        reqPath = STEP_API_LIST ;
    }else{
        reqPath = STEP_API_LIST+'?pageId='+elementId ;
    }
    getData(reqPath,)
        .then(data => {
            let row =  data.data.row
            for(let i =0;i<row.length;i++){
                if (select && select === row[i].id){
                    $(path).append("<option selected value=\""+row[i].id+"\">"+row[i].description+"</option>");
                }else {
                    $(path).append("<option value=\""+row[i].id+"\">"+row[i].description+"</option>");
                }

            }
            form.render("select");
        }).catch((error) => {
        console.log(error)
    });
}


function getQueryVariable(variable)
{
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}




