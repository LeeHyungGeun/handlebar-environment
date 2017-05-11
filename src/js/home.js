import layout from '../templates/common/layout.handlebars';
import home from '../templates/home/index.handlebars';
import '../css/home.css';

$('body').html(layout({
    content: home
}));