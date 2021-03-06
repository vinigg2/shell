var create = (function() {
  var builderProto = {
    append: function(childBuilder) {
      this.element.appendChild(childBuilder.element);
      return this;
    },
    addEventListener: function(event, fn) {
      this.element.addEventListener(event, fn, true);
      return this;
    }
  };

  return function(tagName, attributes) {
    var builder = Object.create( builderProto );

    if (tagName === 'fragment') {
      builder.element = document.createDocumentFragment();
    } else {
      builder.element = document.createElement( tagName );
      for( key in attributes ) {
        if( attributes.hasOwnProperty( key ) ) {
          builder.element[ key ] = attributes[ key ];
        }
      }
    }

    return builder;
  };
}());


(function(){
  var clearCache,
      init;

  clearCache = function() {
    var i, key;
    for( i = localStorage.length - 1; i >= 0 ; i-- ){
      key = localStorage.key( i );
      if( key.indexOf( 'shell-' ) === 0 ) {
        localStorage.removeItem( key );
      }
    }
  };

  init = function() {
    var newAppElement =
      create('div', {className: 'application'} )
        .append(
          create('div', {className: 'toolbar'})
            .append(create('h1', {textContent: 'Shell Demo'})))
        .append(
          create('div', {className: 'app-content'})
            .append(create('p', {textContent: 'Current Version: ' + localStorage['shell-version']}))
            .append(create('button', {className: 'button', textContent: 'Clear Cache'})
              .addEventListener('click', clearCache)));


    var oldAppElement = document.querySelector('.application');
    if (oldAppElement) {
      oldAppElement.parentNode.removeChild(oldAppElement);
    }
    document.body.appendChild(newAppElement.element);
  };

  init();

}());