const scannerDropDown = document.querySelector('#scanner-dropdown');
const scannerTextArea = document.querySelector('#ports');
const commonPortsList = document.querySelector('.common-ports-list');
const scannerForm = document.querySelector('.info-enter-block-form');
const scannerIp = scannerForm.querySelector('#ip');

const portsData ={
    CustomPorts: "",
    ServerPorts: "21, 22, 23, 25, 53, 80, 110, 137, 138, 139, 143, 443, 445, 548, 587, 993, 995, 1433, 1701, 1723, 3306, 5432, 8008, 8443",
    GamePorts: "666, 2302, 3453, 3724, 4000, 5154, 6112, 6113, 6114, 6115, 6116, 6117, 6118, 6119, 7777, 10093, 10094, 12203, 14567, 25565, 26000, 27015, 27910, 28000, 50000",
    ApplicationPorts: "515, 631, 3282, 3389, 5190, 5050, 4443, 1863, 6891, 1503, 5631, 5632, 5900, 6667",
    P2PPorts: "119, 375, 425, 1214, 412, 1412, 2412, 4661, 4662, 4665, 5500, 6346, 6881, 6882, 6883, 6884, 6885, 6886, 6887, 6888, 6889"
}

let userData = {};

scannerForm.addEventListener('submit', (e) =>{
    // e.preventDefault();

    const getInfo = (input, name) =>{
        const element = input.querySelector(`[name="${name}"]`);
        return element.type === "checkbox" ? element.checked : element.value;
    }
    userData.Ip = getInfo(scannerForm, "ip");
    userData.ports = parseInt(getInfo(scannerForm, "ports"));
    userData.Os = getInfo(scannerForm, "os");
    userData.SV = getInfo(scannerForm, "sv");
    console.log(userData); //об'єкт userdata містить всю інфу від юзера
})


function restrictInput(inputElement) {
    inputElement.addEventListener("input", function () {
        const inputValue = inputElement.value;
        const sanitizedValue = inputValue.replace(/[^\d, ]/g, '');
        const formattedValue = sanitizedValue.replace(/ +/g, ', ').replace(/,+/g, ',');
        inputElement.value = formattedValue;
    })
}
restrictInput(scannerTextArea);


const commonPortsTranslate  = (element) =>{
    const text =  element.replace(/\s/g, '').split("&").join(', ');
    return text;
}
const commonPortsAdd = (e) => {
    if (e.target.tagName === "LI"){
        scannerTextArea.value = scannerTextArea.value + (scannerTextArea.value == "" ? "" : ", ") + (commonPortsTranslate(e.target.querySelector('span').textContent));
    }
    else if (e.target.tagName === "SPAN"){
        scannerTextArea.value = scannerTextArea.value + (scannerTextArea.value == "" ? "" : ", ") + (commonPortsTranslate(e.target.textContent));
    }

}

const dropDownChange = () =>{
    scannerTextArea.value = portsData[scannerDropDown.value];
}

scannerDropDown.addEventListener('change', dropDownChange);
commonPortsList.addEventListener('click', commonPortsAdd);




