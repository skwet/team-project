const scannerDropDown = document.querySelector('#scanner-dropdown');
const scannerTextArea = document.querySelector('#entered-ports');
const commonPortsList = document.querySelector('.common-ports-list');
const scannerForm = document.querySelector('.info-enter-block-form');
const scannerIp = scannerForm.querySelector('#domain-ip');

const portsData ={
    CustomPorts: "",
    ServerPorts: "21, 22, 23, 25, 53, 80, 110, 137, 138, 139, 143, 443, 445, 548, 587, 993, 995, 1433, 1701, 1723, 3306, 5432, 8008, 8443",
    GamePorts: "666, 2302, 3453, 3724, 4000, 5154, 6112, 6113, 6114, 6115, 6116, 6117, 6118, 6119, 7777, 10093, 10094, 12203, 14567, 25565, 26000, 27015, 27910, 28000, 50000",
    ApplicationPorts: "515, 631, 3282, 3389, 5190, 5050, 4443, 1863, 6891, 1503, 5631, 5632, 5900, 6667",
    P2PPorts: "119, 375, 425, 1214, 412, 1412, 2412, 4661, 4662, 4665, 5500, 6346, 6881, 6882, 6883, 6884, 6885, 6886, 6887, 6888, 6889"
}

let userData = {};

scannerForm.addEventListener('submit', (e) =>{
    //e.preventDefault();

    const getInfo = (input, name) =>{
        const element = input.querySelector(`[name="${name}"]`);
        return element.type === "checkbox" ? element.checked : element.value;
    }
    userData.domainIp = getInfo(scannerForm, "domain-ip");
    userData.ports = getInfo(scannerForm, "entered-ports")
    userData.detectOs = getInfo(scannerForm, "detect-os");
    userData.detectSV = getInfo(scannerForm, "detect-sv");
    console.log(userData); //об'єкт userdata містить всю інфу від юзера
    scannerResultsLoad();
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


const scannerResultsTable = document.querySelector(".scanner-results table");
const scannerResultsTableElements = document.querySelectorAll(".scanner-results-text table td");
const scannerResultsLoad = () => {
    console.log("Heeeeeeeeeeee haw");
    scannerResultsTableElements.forEach(element => {
        const content = element.textContent.toLowerCase();
        element.style.color = content == "open" ? "var(--port-open-color)" : content == "closed" ? "var(--port-closed-color)" : "";
    })
}

scannerResultsLoad();
scannerResultsTable.addEventListener('change', scannerResultsLoad);




// Vulnerability scanner results processing


let scanResultsInput = `
            - Nikto v2.5.0
            ---------------------------------------------------------------------------
            + Multiple IPs found: 3.125.102.39, 3.124.142.205, 3.125.223.134, 18.158.249.75, 3.125.209.94, 18.192.31.165
            + Target IP:          3.125.102.39
            + Target Hostname:    413d-92-253-212-238.ngrok-free.app
            + Target Port:        443
            ---------------------------------------------------------------------------
            + SSL Info:        Subject:  /CN=*.ngrok-free.app
                               Ciphers:  TLS_AES_128_GCM_SHA256
                               Issuer:   /C=US/O=Let's Encrypt/CN=R3
            + Start Time:         2024-01-02 15:06:33 (GMT2)
            ---------------------------------------------------------------------------
            + Server: No banner retrieved
            + /: The anti-clickjacking X-Frame-Options header is not present. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
            + /: Uncommon header 'ngrok-error-code' found, with contents: ERR_NGROK_3200.
            + /: Uncommon header 'ngrok-trace-id' found, with contents: 30153f2b5caf597de431fd805f6eb4a5.
            + /: The site uses TLS and the Strict-Transport-Security HTTP header is not defined. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
            + /: The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type. See: https://www.netsparker.com/web-vulnerability-scanner/vulnerabilities/missing-content-type-header/
            + No CGI Directories found (use '-C all' to force check all possible dirs)
`;

const scanResults = document.querySelector('.vulnerability-results');

function processTextResultText(inputText) {
    const header = "<h2 >Report Summary</h2>";
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const linkify = (text) => text.replace(urlRegex, function(url) {
        return '<br>&emsp;<a href="' + url + '" target="_blank" class="highlighted-link">' + url + '</a>';
    });
    
    let text = inputText;

    // Replace + /: with bullet point, --- and + with nothing, newlines with <br>, and - with a nothing
    text = text.replace(/\+ \/:/g, '&bull;').replace(/---|\+/g, '').replace(/(\r\n|\n|\r)/gm, '<br>').replace(/-/, '');
    text = text.replace(/(SSL Info:)/g, '$1<br>');
    text = `<span class="scan-results-main-section">${text}</span>`;
   
    text = linkify(text);

    return header + text;
}

const vulnerabilityResDiv = document.createElement('div');
vulnerabilityResDiv.id = 'report-text';
vulnerabilityResDiv.innerHTML = processTextResultText(scanResultsInput);
scanResults.prepend(vulnerabilityResDiv);


const button = document.querySelector('.scan-results-output-bt');
button.addEventListener('click', function() {
    const reportText = document.getElementById('report-text').innerText;
    navigator.clipboard.writeText(reportText)
        .then(() => {
            console.log('Report copied to clipboard');
        })
        .catch(err => {
            console.error('Could not copy report: ', err);
        });
});





