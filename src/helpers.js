const fetchCompanies = async()=> {
    const response = await fetch('https://www.acme-api.com/api/companies');
    const data = await response.json();
    return data;
};

const fetchProfits = async(selected)=> {
    const response = await fetch(`https://www.acme-api.com/api/companies/${selected}/companyProfits`);
        const profits = await response.json();
        const total = profits.reduce((accum, item)=> {
            accum = accum + item.amount;
            return accum;
        }, 0);
    return total;
};

module.exports = {
    fetchCompanies,
    fetchProfits
}