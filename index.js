const state = {
    rawData: [],
    defaultData: [],
    filteredData: []
}

function getData() {
    fetch('https://api.openbrewerydb.org/breweries?by_state')
        .then(response => {
            return response.json()
        }).then((data) => {
            importData(data)
            cardDataCreationDefault()
        }).catch(err => {
            console.log("Error")
        })

}

function importData(data) {
    // console.log("this is my data: ", data)
    const stateData = [...data]
    state.rawData = stateData
    console.log((state))
}

function createStateCard(chosenState) {
    const breweriesList = document.querySelector(".breweries-list")
    const elementLi = document.createElement("li")

    const elementH2 = document.createElement("h2")
    elementH2.innerText = `${chosenState.name}`
    const elementDiv = document.createElement("div")
    elementDiv.innerText = `${chosenState.brewery_type}`
    elementDiv.setAttribute("class", "type")
    elementLi.append(elementH2, elementDiv)

    const elementSectionAddress = document.createElement("section")
    elementSectionAddress.setAttribute("class", "address")
    const elementH3Address = document.createElement("h3")
    elementH3Address.innerText = `Address:`
    const elementAddressRoad = document.createElement("p")
    elementAddressRoad.innerText = `${chosenState.street}`
    const elementAddressCity = document.createElement("p")
    const elementAddressCityStrong = document.createElement("strong")
    elementAddressCityStrong.innerText = `${chosenState.city}, ${chosenState.postal_code}`
    elementAddressCity.append(elementAddressCityStrong)
    elementSectionAddress.append(elementH3Address, elementAddressRoad, elementAddressCity)

    const elementSectionPhone = document.createElement("section")
    elementSectionPhone.setAttribute("class", "phone")
    const elementH3Phone = document.createElement("h3")
    elementH3Phone.innerText = `Phone:`
    const elementPhoneNumber = document.createElement("p")
    // REVIEW THIS FOR N/A numbers
    elementPhoneNumber.innerText = `${chosenState.phone}`
    elementSectionPhone.append(elementH3Phone, elementPhoneNumber)

    const elementSectionLink = document.createElement("section")
    elementSectionLink.setAttribute("class", "link")
    const elementALink = document.createElement("a")
    elementALink.innerText = `Visit Website`
    elementALink.setAttribute("href", `${chosenState.website_url}`)
    elementALink.setAttribute("target", "_blank")
    elementSectionLink.append(elementALink)

    elementLi.append(elementSectionAddress, elementSectionPhone, elementSectionLink)
    // elementLi.append(elementSectionAddress, elementSectionPhone, elementSectionLink)
    breweriesList.append(elementLi)
}

function createAllCard(whichDataToShow) {
    const breweriesList = document.querySelector(".breweries-list")
    breweriesList.innerHTML = ""
    console.log(whichDataToShow)
    for (let i = 0; i < whichDataToShow.length; i++) {

        createStateCard(whichDataToShow[i])
    }
}

function cardDataCreationDefault() {
    addFilterByType()
    console.log("now I filter stuff")
    filterDefaultData()
    // console.log("Inside dataAndCreation, This is my state", (state.rawData))
    // console.log("Inside dataAndCreation, This is my filtered data", state.filteredData)
    // console.log("Inside dataAndCreation, This is my default data", state.defaultData)
    console.log("this is my defaultdata: ", state.defaultData)
    createAllCard(state.defaultData)
    
}

function filterDefaultData() {
    for (i = 0; i < state.rawData.length; i++) {
        if (state.rawData[i].brewery_type.includes("micro")) {
            state.defaultData.push(state.rawData[i])
        } else if (state.rawData[i].brewery_type.includes("brewpub")) {
            state.defaultData.push(state.rawData[i])
        } else if (state.rawData[i].brewery_type.includes("regional")) {
            state.defaultData.push(state.rawData[i])
        }
    }
}

function filterData(dataType, filterCategory, keyword) {
    // console.log("filterData: " + keyword)
    const newFilteredData = state.rawData.filter(
        newData => newData[filterCategory] === keyword)
    state[dataType] = [...newFilteredData]
    console.log(state[dataType])
}

function clearAllCardAndState() {
    state.filteredData = []
}


function searchBar() {
    var input, filter, ul, li, breweryName, i, txtValue;
    input = document.getElementById('search-breweries')
    filter = input.value.toUpperCase()
    ul = document.getElementById("breweries-list")
    li = ul.getElementsByTagName('li')

    for (i = 0; i < li.length; i++) {
        breweryName = li[i].getElementsByTagName("h2")[0]
        txtValue = breweryName.textContent || breweryName.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""
        } else {
            li[i].style.display = "none"
        }
    }
}

function addFunctionToSearchBar() {
    const searchBar = document.getElementById('search-breweries')
    searchBar.setAttribute("onkeyup", "searchBar()")
}


function filterByType() {
    const filterType = document.getElementById('filter-by-type')
    if (filterType.value != "") {
    console.log("filtertype is ", filterType.value)
    filterData("filteredData", "brewery_type", filterType.value)
    console.log("inside infliterByType, filteredData is ", state.filteredData)
    // clearAllCardAndState()
    createAllCard(state.filteredData)
    } else (
        cardDataCreationDefault()
    )
}

function addFilterByType() {
    // filter-by-type-form
    const filterType = document.getElementById('filter-by-type')
    filterType.setAttribute("onchange", "filterByType()")
}

function init() {
    getData()
    addFunctionToSearchBar()
}

init()

// addEventlistener not click or submit but CHANGE
// onkeyup="searchBar()"