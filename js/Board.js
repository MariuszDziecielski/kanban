const board = {
    name: 'Tablica Kanban',
    createColumn(column) {
        this.element.append(column.element);
        initSortable();
    },
    element: $('#board .column-container')
};
$('#columnName').focus(() => {
    $('#columnName').val('');
});
$('.create-column')
    .click(() => {
        const columnName = $('#columnName').val();
        if (columnName) {
            $.ajax({
                url: `${baseUrl}/column`,
                method: 'POST',
                data: {
                    name: columnName
                },
                success: response => {
                    const column = new Column(response.id, columnName);
                    board.createColumn(column);
                }
            });
        }
        $('#columnName').val('Nowa kolumna');
    });
function initSortable() {
    $('.card-list').sortable({
        connectWith: '.card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
}