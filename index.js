const state = {
    rawData: [],
    defaultData: [],
    filteredData: [],
    displayedData: [],
    cities: []
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

    const elementAddressState = document.createElement("p")
    const elementAddressStateStrong = document.createElement("strong")
    elementAddressStateStrong.innerText = `${chosenState.state}`
    elementAddressState.append(elementAddressStateStrong)

    elementAddressCity.append(elementAddressCityStrong)
    elementSectionAddress.append(elementH3Address, elementAddressRoad, elementAddressCity, elementAddressState)

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
    breweriesList.append(elementLi)
}

function createAllCard(whichDataToShow) {
    state.displayedData = [...whichDataToShow]
    clearCityCard()
    // console.log(whichDataToShow)
    createAllStateCard(whichDataToShow)
    createAllCityCard(whichDataToShow)
}

function createAllStateCard(whichDataToShow) {
    const breweriesList = document.querySelector(".breweries-list")
    breweriesList.innerHTML = ""
    for (let i = 0; i < whichDataToShow.length; i++) {
        createStateCard(state.displayedData[i])
    }
}

function createAllCityCard(whichDataToShow) {
    for (let i = 0; i < whichDataToShow.length; i++) {
        createCityCard(state.displayedData[i])
    }
}

function cardDataCreationDefault() {
    addFilterByType()
    state.defaultData = []
    filterDefaultData()
    console.log("this is my defaultdata: ", state.defaultData)
    clearCityCard()
    createAllCard(state.defaultData)
    console.log("this is my displayedData: ", state.displayedData)

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
}

function clearAllCardAndState() {
    state.filteredData = []
}


function searchBarByName() {
    var input, filter, ul, li, breweryName, i, txtValue, cityForm, cityInput, cityLabel;
    input = document.getElementById('search-breweries')
    filter = input.value.toUpperCase()
    ul = document.getElementById("breweries-list")
    li = ul.getElementsByTagName('li')
    cityForm = document.getElementById("filter-by-city-form")
    // cityInput = cityForm.getElementsByTagName('input')
    // cityLabel = document.getElementsByTagName('label')

    for (i = 0; i < li.length; i++) {
        breweryName = li[i].getElementsByTagName("h2")[0]
        cityInput = cityForm.getElementsByTagName('input')[i]
        cityLabel = cityForm.getElementsByTagName('label')[i]
        txtValue = breweryName.textContent || breweryName.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""
            cityInput.style.display = ""
            cityLabel.style.display = ""
        } else {
            li[i].style.display = "none"
            cityInput.style.display = "none"
            cityLabel.style.display = "none"
        }
    }
}

function eventSearchBarByName() {
    const searchBar = document.getElementById('search-breweries')
    searchBar.setAttribute("onkeyup", "searchBarByName()")
}

function eventSearchBarState() {
    const searchBarButton = document.getElementById('select-state-form').getElementsByTagName("input")[1]
    searchBarButton.addEventListener("click", event => searchBarState(event))
}

function searchBarState(event) {
    var input, filter, ul, li, breweryState, i, txtValue, cityForm, cityInput, cityLabel;
    event.preventDefault()
    input = document.getElementById('select-state')
    filter = input.value.toUpperCase()
    ul = document.getElementById("breweries-list")
    li = ul.getElementsByTagName('li')
    cityForm = document.getElementById("filter-by-city-form")

    for (i = 0; i < li.length; i++) {
        breweryState = li[i].getElementsByTagName("p")[2]
        cityInput = cityForm.getElementsByTagName('input')[i]
        cityLabel = cityForm.getElementsByTagName('label')[i]
        txtValue = breweryState.textContent || breweryState.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""
            cityInput.style.display = ""
            cityLabel.style.display = ""
        } else {
            li[i].style.display = "none"
            cityInput.style.display = "none"
            cityLabel.style.display = "none"
        }
    }
}


function filterByType() {
    const filterType = document.getElementById('filter-by-type')
    if (filterType.value != "") {
        filterData("filteredData", "brewery_type", filterType.value)
        createAllCard(state.filteredData)
    } else (
        cardDataCreationDefault()
    )
}

function addFilterByType() {
    const filterType = document.getElementById('filter-by-type')
    filterType.setAttribute("onchange", "filterByType()")
}

function clearCityCard() {
    cityForm = document.getElementById('filter-by-city-form')
    cityForm.innerHTML = ""
}

function createCityCard(chosenState) {
    const cityForm = document.getElementById("filter-by-city-form")

    const cityInput = document.createElement("input")
    cityInput.setAttribute("type", "checkbox")
    cityInput.setAttribute("name", `${chosenState.city}`)
    cityInput.setAttribute("value", `${chosenState.city}`)
    cityInput.addEventListener("click", () => checkboxCity(cityInput))

    const cityLabel = document.createElement("label")
    cityLabel.innerText = `${chosenState.city}`
    cityLabel.setAttribute("for", `${chosenState.city}`)
    cityForm.append(cityInput, cityLabel)
}

function hideAndShowCard(cityInput) {
    var filter, ul, li, breweryName, i, txtValue, cityForm, cityInput;
    filter = cityInput.name.toUpperCase()
    ul = document.getElementById("breweries-list")
    li = ul.getElementsByTagName('li')
    cityForm = document.getElementById("filter-by-city-form")
    for (i = 0; i < li.length; i++) {
        breweryName = li[i].getElementsByTagName("p")[1]
        txtValue = breweryName.textContent.substr(0, breweryName.textContent.indexOf(',')) || breweryName.innerText.substr(0, breweryName.innerText.indexOf(','))
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""
        } else {
            li[i].style.display = "none"
        }
    }
}

function showOneMoreCard(cityInput) {
    var filter, ul, li, breweryName, i, txtValue, cityForm, cityInput;
    filter = cityInput.name.toUpperCase()
    // console.log(filter)
    ul = document.getElementById("breweries-list")
    li = ul.getElementsByTagName('li')
    cityForm = document.getElementById("filter-by-city-form")
    // console.log("I'll show another card")
    for (i = 0; i < li.length; i++) {
        breweryName = li[i].getElementsByTagName("p")[1]
        txtValue = breweryName.textContent.substr(0, breweryName.textContent.indexOf(',')) || breweryName.innerText.substr(0, breweryName.innerText.indexOf(','))
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""
        }
    }
}



function filterCityCheckbox(cityInput) {
    if (state.cities.length < 1) {
        // const newFilteredData = state.rawData.filter(
        // newData => newData.city === cityInput.name)
        // state.displayedData = [...newFilteredData]
        // // filterData("displayedData", "city", cityInput.name)
        // console.log("this is my displayedData: ", state.displayedData)
        // console.log(state.displayedData.length)
        // createAllStateCard(state.displayedData)
        state.cities.push(cityInput.name)
        hideAndShowCard(cityInput)
    } else if (state.cities.length > 0) {
        if (state.displayedData[0].name.includes(cityInput.name)) {
        //     console.log("can't happen for now")
        //     state.displayedData.push(state.rawData[0])
        } else{
            state.cities.push(cityInput.name)
            console.log("new check")
            showOneMoreCard(cityInput)
        }
    }
}

function hideCard(cityInput) {
    var filter, ul, li, breweryName, i, txtValue, cityForm, cityInput;
    filter = cityInput.name.toUpperCase()
    ul = document.getElementById("breweries-list")
    li = ul.getElementsByTagName('li')
    cityForm = document.getElementById("filter-by-city-form")
    for (i = 0; i < li.length; i++) {
        breweryName = li[i].getElementsByTagName("p")[1]
        txtValue = breweryName.textContent.substr(0, breweryName.textContent.indexOf(',')) || breweryName.innerText.substr(0, breweryName.innerText.indexOf(','))
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "none"
        }
    }
}

function showAllCard(cityInput) {
    var filter, ul, li, breweryName, i, txtValue, cityForm, cityInput;
    filter = cityInput.name.toUpperCase()
    ul = document.getElementById("breweries-list")
    li = ul.getElementsByTagName('li')
    cityForm = document.getElementById("filter-by-city-form")
    for (i = 0; i < li.length; i++) {
        breweryName = li[i].getElementsByTagName("p")[1]
        txtValue = breweryName.textContent.substr(0, breweryName.textContent.indexOf(',')) || breweryName.innerText.substr(0, breweryName.innerText.indexOf(','))
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""
        } else {
            li[i].style.display = ""
        }
    }
}

function filterCityRemoveCheckbox(cityInput){
    if (state.cities.length === 1) {
        console.log("showAllCard!!!")
        showAllCard(cityInput)
    }   else if (state.cities.length > 0){
        hideCard(cityInput)
        state.cities = state.cities.filter(function (e) {return e !== `${cityInput.name}`})
        console.log(`My state.cities is: ${state.cities}`)
    }

}

function checkboxCity(cityInput) {
    if (cityInput.checked == true) {
        console.log("check on for", cityInput.name)
        filterCityCheckbox(cityInput)
        console.log(`My state.cities is: ${state.cities}`)
    } else {
        console.log("check off for", cityInput.name)
        filterCityRemoveCheckbox(cityInput)
        console.log(`My state.cities is: ${state.cities}`)
    }
}

function init() {
    getData()
    eventSearchBarByName()
    eventSearchBarState()
}

init()

// addEventlistener not click or submit but CHANGE
// onkeyup="searchBar()"