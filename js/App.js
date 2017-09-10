const baseUrl = 'https://kodilla.com/pl/bootcamp-api',
    myHeaders = {
        'X-Client-Id': 1657,
        'X-Auth-Token': 'f4df135d1358596b961f53dc21f94c06'
    };
$.ajaxSetup({
    headers: myHeaders
});
$.ajax({
    url: `${baseUrl}/board`,
    method: 'GET',
    success: function (response) {
        setupColumns(response.columns);
    }
});
function setupColumns(columns) {
    columns.forEach(column => {
        const col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}
function setupCards(col, cards) {
    cards.forEach(card => {
        card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.createCard(card);
    });
}