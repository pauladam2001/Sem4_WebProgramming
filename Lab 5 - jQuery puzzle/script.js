$(document).ready(function () {
    let aspect = "4:4", aspectW = parseInt(aspect.split(":")[0]), aspectH = parseInt(aspect.split(":")[1]), container = $("#puzzle"),
        imgContainer = container.find("figure"), img = imgContainer.find("img"), path = img.attr("src"), piece = $("<div/>"),
        pieceW = Math.floor(img.width() / aspectW), pieceH = Math.floor(img.height() / aspectH), idCounter = 0, positions = [],
        empty = {
            top: 0,
            left: 0,
            bottom: pieceH,
            right: pieceW
        },
        previous = {};

    //generate puzzle pieces
    for (let x = 0, y = aspectH; x < y; x++) {
        for (let a = 0, b = aspectW; a < b; a++) {
            let top = pieceH * x, left = pieceW * a;

            piece.clone().attr("id", idCounter++).css({
                width: pieceW,
                height: pieceH,
                position: "absolute",
                top: top,
                left: left,
                backgroundImage: ["url(", path, ")"].join(""),
                backgroundPosition: ["-", pieceW * a, "px ", "-", pieceH * x, "px"].join("")
            }).appendTo(imgContainer);

            //store positions
            positions.push({ top: top, left: left });
        }
    }

    //remove original image
    img.remove();

    //remove first piece from board
    container.find("#0").remove();

    //remove first item in positions array
    positions.shift();

    $("#shuffle").on("click", function (e) {

        //shuffle the pieces randomly
        let pieces = imgContainer.children();

        function shuffle(array) {
            let i = array.length;
            if (i === 0) {
                return false;
            }
            while (--i) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffle(pieces);

        //set position of shuffled images
        $.each(pieces, i => {
            pieces.eq(i).css(positions[i]);
        });

        //replace existing pieces with shuffled pieces
        pieces.appendTo(imgContainer);

        //make sure empty slot is at position 0
        empty.top = 0;
        empty.left = 0;

        //make pieces draggable
        pieces.draggable({
            containment: "parent",
            grid: [pieceW, pieceH],
            start: function (e, ui) {

                let current = getPosition(ui.helper);

                //set axis depending on location relative to empty space
                if (current.left === empty.left) {
                    ui.helper.draggable("option", "axis", "y");
                } else if (current.top === empty.top) {
                    ui.helper.draggable("option", "axis", "x");
                } else {
                    ui.helper.trigger("mouseup");
                    return false;
                }

                //prevent drag if not adjacent to empty space
                if (current.bottom < empty.top || current.top > empty.bottom || current.left > empty.right || current.right < empty.left) {
                    ui.helper.trigger("mouseup");
                    return false;
                }

                //remember current location
                previous.top = current.top;
                previous.left = current.left;

            },
            drag: function (e, ui) {

                let current = getPosition(ui.helper);

                //stop dragging if we are in the empty space
                if (current.top === empty.top && current.left === empty.left) {
                    ui.helper.trigger("mouseup");
                    return false;
                }

                //stop dragging if moving away from empty space
                if (current.top > empty.bottom || current.bottom < empty.top || current.left > empty.right || current.right < empty.left) {
                    ui.helper.trigger("mouseup").css({
                        top: previous.top,
                        left: previous.left
                    });
                    return false;
                }
            },
            stop: function (e, ui) {
                let current = getPosition(ui.helper),
                    correctPieces = 0;

                //move empty space if space now occupied
                if (current.top === empty.top && current.left === empty.left) {
                    empty.top = previous.top;
                    empty.left = previous.left;
                    empty.bottom = previous.top + pieceH;
                    empty.right = previous.left + pieceW;
                }

                //get positions of all pieces
                $.each(positions, i => {

                    let currentPiece = $("#" + (i + 1)),
                        currentPosition = getPosition(currentPiece);

                    //is the current piece in the correct place?
                    if (positions[i].top === currentPosition.top && positions[i].left === currentPosition.left) {
                        correctPieces++;
                    }
                });

                //end game
                if (correctPieces === positions.length) {

                    //display message
                    $("<p/>", {
                        text: "Congratulations, You solved the puzzle!"
                    }).appendTo("#ui");
                }
            }
        });

        //helper to generate location
        function getPosition(el) {
            return {
                top: parseInt(el.css("top")),
                bottom: parseInt(el.css("top")) + pieceH,
                left: parseInt(el.css("left")),
                right: parseInt(el.css("left")) + pieceW
            };
        }
    });
});