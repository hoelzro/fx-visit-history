let info = document.querySelector('#info');
browser.tabs.query({active: true, currentWindow: true}).then(function([tab]) {
    let url = tab.url;

    return browser.history.getVisits({
        url: url
    });
}).then(function(visits) {
    if(visits.length > 1) {
        let lastVisitDate = new Date(visits[1].visitTime);
        lastVisitDate = lastVisitDate.toDateString() + ' ' + lastVisitDate.toTimeString();
        if(visits.length > 2) {
            let numVisits = visits.length - 1;
            let firstVisitDate = new Date(visits[visits.length - 1].visitTime);
            firstVisitDate = firstVisitDate.toDateString() + ' ' + firstVisitDate.toTimeString();
            info.innerText = `You have visited this page ${numVisits} time(s) between your first visit on ${firstVisitDate} and your last visit on ${lastVisitDate}`;
        } else {
            info.innerText = `Your last and only visit was on ${lastVisitDate}`;
        }
    } else {
        info.innerText = 'This is your first visit to this page';
    }
});
