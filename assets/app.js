console.log('in browser');

const list = document.querySelector('ul');

const init = async()=> {
    const response = await fetch('https://www.acme-api.com/api/companies');
    const data = await response.json();
    const html = data.map( company => {
        return `
        <li>
            ${ company.name }
        </li>
        `;
    }).join('');
    list.innerHTML = html;
}

init();