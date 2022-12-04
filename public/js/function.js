// $(function() {
//     var checkout_proceed=1;
//     var filter_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     var filter_tel = /^\d{11}$/;
//     $('input[type=email]').change(function(){
//         if (!filter_email.test($(this).val()) && $(this).val()!='') {
//             $(this).css('border','1px solid red');
//         }else{
//             $(this).css('border','1px solid #ced4da');
//             checkout_proceed=1;
//         }
//     });
//     $('input[type=tel]').change(function(){
//         if (!filter_tel.test($(this).val()) && $(this).val()!='') {
//             $(this).css('border','1px solid red');
//         }else{
//             $(this).css('border','1px solid #ced4da');
//             checkout_proceed=1;
//         }
//     });
//     /* ******************************************** Tables ******************************************** */
//     $(".add-to-cart-btn").on('click', function() {
//         currentItem = $(this).closest(".cart-item");
//         mealID = currentItem.find(".cart-item-id").val();
//         $current = $("#items_count")[0] ? parseInt($("#items_count")[0].innerText) : 0;
//         $quan = currentItem.find(".cart-item-quantity").val();

//         console.log($quan);
//         if (typeof($quan) == "undefined" || $quan == "" || parseInt($quan) < 1) { $quan = 1; }
//         $new = parseInt($current) + parseInt($quan);
//         $("#items_count")[0] ? $("#items_count")[0].innerText = $new : false;
//         // to replace the above later
//         $(".items-count").html($new);
//         console.log(mealID);
//         $type = getOrderType($(this));
//         addToCart(mealID, $quan, $type);

//     });

//     $(".remove-from-cart-btn").on('click', function() {
//         currentItem = $(this).closest(".cart-item");
//         noItems = $(".no-items");
//         mealID = currentItem.find(".cart-item-hash").val();
//         console.log(mealID);
//         showLoader();
//         type = getOrderType($(this));
//         removeFromCart(mealID, type);
//     });

//     $(".proceed-btn").on('click', function() {
//         confirmed = confirm("Are you sure you want to proceed with your order?");
//         if (confirmed) {
//             showLoader();
//             order_type = getOrderType($(this));
//             if (order_type == "takeaway") {
//                 customer = JSON.stringify(getFormData($("#takeaway-form")));
//                 $('#takeaway-form input').each(function (index, element) {
//                     if($(this).val()!=''){
//                         if ($(this).attr('type') == 'email' && !filter_email.test($(this).val())) {
//                             $(this).css('border','1px solid red');
//                             checkout_proceed = 0;
//                         }
//                         else if ($(this).attr('type') == 'tel' && !filter_tel.test($(this).val())) {
//                             $(this).css('border','1px solid red');
//                             checkout_proceed = 0;
//                         }
//                     }
//                 });
//             } else {
//                 customer = null;
//             }
//             if(checkout_proceed==1) {
//                 $.ajax({
//                     method: "POST",
//                     url: "/" + order_type + "/proceed_with_order",
//                     data: {
//                         restaurant_id: $("#restaurant_id").val(),
//                         table_id: $("#table_id").val(),
//                         customer: customer,
//                         "_token": $('meta[name="csrf-token"]').attr('content'),
//                     }
//                 }).done(function (response_redirect) {
//                     window.location.replace(response_redirect);

//                     // if (typeof(response.data) != "undefined") {
//                     //     var message = response.data.message;
//                     //     alert(message);
//                     //     menu_link = $("#restaurant_link").val();
//                     //     // window.location.replace(menu_link);
//                     // } else {
//                     //     $("html").html(response);
//                     // }
//                 });
//             }else{
//                 swal({
//                     type: "error",
//                     title: "Entry Field Error",
//                     icon: 'error',
//                     text: "You have entered error data please recheck them again",
//                     confirmButtonClass: "btn btn-danger"
//                 });
//             }
//         }
//     })

//     $(".update-cart-btn").on('click', function() {

//         showLoader();
//         data = [];
//         $(".cart-item").toArray().forEach(function(el) {

//             id = $(el).find(".cart-item-id").val();
//             hash = $(el).find(".cart-item-hash").val();
//             console.log(id);
//             quan = $(el).find(".cart-item-quantity").val();
//             console.log(quan);
//             console.log(hash);
//             data.push({ id: id, quantity: quan, hash: hash });

//         });
//         data = JSON.stringify(data);
//         type = getOrderType($(this));
//         updateCart(data, type);
//     })


//     $('.plus').on('click', function() {
//         quan = $(this).closest("div").find(".cart-item-quantity");
//         new_val = parseInt(quan.val()) + 1;
//         quan.val(new_val);
//     })

//     $('.minus').on('click', function() {
//         //If n is bigger or equal to 1 subtract 1 from n
//         quan = $(this).closest("div").find(".cart-item-quantity");
//         new_val = parseInt(quan.val()) - 1;

//         if (new_val >= 1) {
//             quan.val(new_val);
//             // $(this).closest("div").find(".cart-item-quantity").val(--n);
//         }
//     });

//     $(".check-order-btn").on('click', function() {
//         confirmed = confirm("Are you sure you want to order check?");
//         if (confirmed) {
//             showLoader();
//             $.ajax({
//                 method: "POST",
//                 url: "/check_order",
//                 data: {
//                     restaurant_id: $("#restaurant_id").val(),
//                     table_id: $("#table_id").val(),
//                     "_token": $('meta[name="csrf-token"]').attr('content'),
//                 }
//             }).done(function(message) {
//                 console.log(message);

//                 alert(message);
//                 hideLoader();
//             });
//         }
//     })

// });

// function showLoader() {

//     $('.loader').addClass('show');

// }

// function hideLoader() {

//     $('.loader').removeClass('show');

// }


// function getOrderType(element) {
//     $type = "table"; //default is table order

//     if (element.hasClass("takeaway_order")) {
//         console.log("takeaway");
//         $type = "takeaway";
//     }
//     if (element.hasClass("delivery_order")) {
//         console.log("delivery");
//         $type = "delivery";
//     }

//     return $type;
// }

// function addToCart(mealID, quantity, order_type) {
//     $.ajax({
//         method: "POST",
//         url: "/" + order_type + "/add_to_cart/" + mealID + "/" + quantity,
//         data: { "_token": $('meta[name="csrf-token"]').attr('content'), }
//     }).done(function(data) {
//         console.log("added");
//         // data = JSON.parse(data);
//         console.log(data);
//         // confirmed = confirm("The meal is adde, go to cart?");

//     });
// }

// function removeFromCart(mealID, order_type) {
//     $.ajax({
//         method: "POST",
//         url: "/" + order_type + "/remove_from_cart/" + mealID,
//         data: { "_token": $('meta[name="csrf-token"]').attr('content'), }
//     }).done(function(newSubTotal) {
//         console.log("removed");
//         location.reload();
//     });
// }

// function updateCart(data, order_type) {
//     $.ajax({
//         method: "POST",
//         url: "/" + order_type + "/update_cart",
//         data: {
//             meals: data,
//             "_token": $('meta[name="csrf-token"]').attr('content'),
//         }
//     }).done(function(data) {
//         location.reload();
//     });
// }


// function getFormData($form) {
//     var unindexed_array = $form.serializeArray();
//     var indexed_array = {};

//     jQuery.map(unindexed_array, function(n, i) {
//         indexed_array[n['name']] = n['value'];
//     });

//     return indexed_array;
// }



// /* ******************************************** Takeaway ******************************************** */



// /* ******************************************** Common ******************************************** */
