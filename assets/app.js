console.log('in browser');

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
        const response = await fetch(`https://www.acme-api.com/api/companies/${selected}/companyProfits`);
        const profits = await response.json();
        const total = profits.reduce((accum, item)=> {
            accum = accum + item.amount;
            return accum;
        }, 0);
        profitsDiv.innerHTML = `$${total.toFixed(2)}`;
    } else {
        profitsDiv.innerHTML = "";
    }
}
window.addEventListener('hashchange', ()=> {
    renderCompanies();
})

const init = async()=> {
    const response = await fetch('https://www.acme-api.com/api/companies');
    const data = await response.json();
    companies = data;

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