function Column(id, name) {
    var self = this;
	this.id = id;
    this.name = name;
	this.element = createColumn();
	function createColumn() {
		var column = $('<div class="column"></div>'),
            columnTitle = $('<h2 class="column-title">' + self.name + '</h2>'),
            columnCardList = $('<ul class="card-list"></ul>'),
            columnDelete = $('<button class="btn-delete" title="Usuń kolumnę z tablicy!"></button>'),
            label = $('<label>').attr('for', 'cardName').text('Wpisz nazwę karty!'),
            input = $('<input>').attr({
                'type': 'text',
                'id': 'cardName',
                'value': 'Nowa karta',
                'title': 'Wpisz nazwę nowej karty tablicy!'
            }),
            columnAddCard = $('<button class="column-add-card" title="Dodaj nową kartę do tablicy!">Dodaj kartę</button>');
		columnDelete.click(function () {
			self.deleteColumn();
		});
        input.focus(function () {
            input.val('');
        });
		columnAddCard.click(function (event) {
            var cardName = input.val();
            event.preventDefault();
            if (cardName) {
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: cardName,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function (response) {
                        var card = new Card(response.id, cardName);
                        self.createCard(card);
                    }
                });
            }
            input.val('Nowa karta');
        });
		column.append(columnDelete)
            .append(columnTitle)
            .append(label)
            .append($('<br>'))
            .append(input)
            .append($('<br>'))
			.append(columnAddCard)
			.append(columnCardList);
        return column;
    }
}
Column.prototype = {
	createCard: function (card) {
        this.element.children('ul').append(card.element);
	},
	deleteColumn: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.element.remove();
            }
        });
    }
};