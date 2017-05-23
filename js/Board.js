var board = {
    name: 'Tablica Kanban',
	createColumn: function (column) {
        this.element.append(column.element);
        initSortable();
	},
	element: $('#board .column-container')
};
$('#columnName').focus(function () {
    $('#columnName').val('');
});
$('.create-column')
    .click(function () {
        var columnName = $('#columnName').val();
        if (columnName) {
            $.ajax({
                url: baseUrl + '/column',
                method: 'POST',
                data: {
                    name: columnName
                },
                success: function (response) {
                    var column = new Column(response.id, columnName);
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