    //adjusts indices of form fields when removing items
    function adjustIndices(removedIndex) {
    var $forms = $('.subform');

    $forms.each(function(i) {
        var $form = $(this);
        var index = parseInt($form.data('index'));
        var newIndex = index - 1;

        if (index < removedIndex) {
            // Skip
            return true;
        }

        // Change ID in form itself
        $form.attr('id', $form.attr('id').replace(index, newIndex));
        $form.data('index', newIndex);

        // Change IDs in form inputs
        $form.find('input').each(function(j) {
            var $item = $(this);
            $item.attr('id', $item.attr('id').replace(index, newIndex));
            $item.attr('name', $item.attr('name').replace(index, newIndex));
        });
    });
}

//remove a subform
function removeForm() {
    var $removedForm = $(this).closest('.subform');
    var removedIndex = parseInt($removedForm.data('index'));

    $removedForm.remove();

    // Update indices
    adjustIndices(removedIndex);
}


function addQuestion(url, q_id) {
    
    $.ajax({
        type: "GET",
        data: {'quiz_id': q_id},
        url: url,
        error: function(response) {
            alert(response.statusText);
            console.log(response.statusText);
        },
        success: function() {
            refresh("#body");
        }
    });
}
function addAnswer(url, q_id) {
    $.ajax({
        type: "GET",
        data: {'question_id': q_id},
        url: url,
        error: function(response) {
            alert(response.statusText);
            console.log(response.statusText);
        },
        success: function() {
            refresh("#body");
        }
    });
}
function removeQuestion(url, q_id) {
    $.ajax({
        type: "GET",
        data: {'question_id': q_id},
        url: url,
        error: function(response) {
            alert(response.statusText);
            console.log(response.statusText);
        },
        success: function() {
            refresh("#body");
        }
    });
}
function removeAnswer(url, a_id) {
     $.ajax({
        type: "GET",
        data: {'answer_id': a_id},
        url: url,
        error: function(response) {
            alert(response.statusText);
            console.log(response.statusText);
        },
        success: function() {
            refresh("#body");
        }
    });
}
//add a subform
function addForm() {
    var $templateForm = $('#question-_-form');

    if (!$templateForm) {
        console.log('[ERROR] Cannot find template');
        return;
    }

    // Get Last index
    var $lastForm = $('.subform').last();

    var newIndex = 0;

    if ($lastForm.length > 0) {
        newIndex = parseInt($lastForm.data('index')) + 1;
    }

    // Maximum of 20 subforms
    if (newIndex > 20) {
        console.log('[WARNING] Reached maximum number of elements');
        return;
    }

    // Add elements
    var $newForm = $templateForm.clone();

    $newForm.attr('id', $newForm.attr('id').replace('_', newIndex));
    $newForm.data('index', newIndex);

    $newForm.find('input').each(function(idx) {
        var $item = $(this);

        $item.attr('id', $item.attr('id').replace('_', newIndex));
        $item.attr('name', $item.attr('name').replace('_', newIndex));
    });

    // Append
    $('#subforms-container').append($newForm);
    $newForm.addClass('subform');
    $newForm.removeClass('is-hidden');

    $newForm.find('.remove').click(removeForm);
}

function addQuestionContent(q_id){
    
    document.getElementById("question-form-" + q_id).style.display = "block";
};

function addAnswerContent(q_id, a_id){
    document.getElementById("answer-form-" + q_id + "-" + a_id).style.display = "block";
};

function shiftQuestion(url, q_id, direction) {
    
    $.ajax({
        type: "GET",
        data: {'question_id': q_id,
                'direction': direction},
        url: url,
        error: function(response) {
            alert(response.statusText);
            console.log(response.statusText);
        },
        success: function() {
            refresh("#body");
        }
    });
};

$(document).ready(function() {
    // $('#add').click(addForm);
    // $('.remove').click(removeForm);
});

function refresh(section)
{
    console.log("Beggining Refresh")
    $(section).load(section);
    console.log("Refreshed");
};

function showEditQuestionContainer(index) {
    
    document.getElementById("question-content-display-" + index).style.display = "none";
    document.getElementById("question-content-edit-form-" + index).style.display = "block";
};

function showEditQuizNameContainer() {
    document.getElementById("quizname").style.display = "none";
    document.getElementById("quiz-name-edit-form").style.display = "block";
}

function resetEditContainer(index) {
    refresh("#body");
};

function showEditAnswerContainer(index) {
    console.log("id being edited is " + index);
    document.getElementById("answer-content-display-" + index).style.display = "none";
    document.getElementById("answer-content-edit-form-" + index).style.display = "block";
};

function setQType(url,question_id, qtype) {
    $.ajax({
        type: "GET",
        data: {'question_id': question_id,
                'qtype': qtype},
        url: url,
        error: function(response) {
            alert(response.statusText);
            console.log(response.statusText);
        },
        success: function() {
            refresh("#body");
        }
    });
};

function changeActiveQuestion(url,question_id,quiz_id) {
    event.preventDefault();
    $.ajax({
        type: "GET",
        data: {'question_id': question_id,
                'quiz_id': quiz_id},
        url: url,
        error: function(response) {
            alert(response.statusText);
            console.log(response.statusText);
        },
        success: function() {
            refresh("#body");
        }
    });
};

function setAnswer(url,answer_id,classroom_id, page_num,quiz_id,value){
    event.preventDefault();
    
    $.ajax({
        type: "GET",
        data: {'answer_id': answer_id, 'classroom_id': classroom_id, 
        'page_num': page_num, 'quiz_id':quiz_id, 'value':value},
        url: url,
        error: function(response) {
            alert(response.statusText);
            console.log(response.statusText);
        },
        success: function() {
            refresh("#body");
        }
    });
}

function showTrueFalse(choice){
    
    var button = document.getElementById(choice+'-btn');
    button.classList.add('active');
    console.log(button);

    if(choice == 'true'){
        button = document.getElementById('false-btn');
        button.classList.remove('active');
    }
    else{
        button = document.getElementById('true-btn');
        button.classList.remove('active');
    }
    document.getElementById("check_button").style.display = "block";
    
}

function setTrueFalse(choice){
    var t = document.getElementById('true-btn');
    var f = document.getElementById('false-btn');

    console.log(t);
    console.log(f);

    if (t.classList[t.classList.length -1] === 'active'){
        setAnswer();
    }
    else{
        setAnswer();
    }

}