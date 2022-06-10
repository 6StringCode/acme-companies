const { fetchCompanies, fetchProfits } = require('./helpers');

const list = document.querySelector('ul');
const profitsDiv = document.querySelector('div');

let companies;

const renderCompanies = async()=> {
    const selected = window.location.hash.slice(1);

    const html = companies.map( company => {
        return `
        <li ${ selected === company.id ? "class='selected'" : ""}>
            <a href='#${selected === company.id ? "": company.id}'>
            ${ company.name }
            </a>
        </li>
        `;
    }).join('');
    list.innerHTML = html;
    
    if(selected){
        const total = await fetchProfits(selected);
        profitsDiv.innerHTML = `$${total.toFixed(2)}`;
    } else {
        profitsDiv.innerHTML = "";
    }
}
window.addEventListener('hashchange', ()=> {
    renderCompanies();
})

const init = async()=> {
    companies = await fetchCompanies();

    renderCompanies(); //this replaced the below:
    // const html = data.map( company => {
    //     return `
    //     <li>
    //         <a href='#${company.id}'>
    //         ${ company.name }
    //         </a>
    //     </li>
    //     `;
    // }).join('');
    // list.innerHTML = html;
}

init();