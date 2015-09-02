# Validation

You can validate fields by adding a `Formation.Validator` object to the `type` property of a schema definition:

```jsx{5,8,11}
var Validator = require('react-formation').Validator;

var schema = {
  email: {
    type: Validator.email()
  },
  creditCard: {
    type: Validator.creditCard()
  },
  numberOfApples: {
    type: Validator.number().min(1).max(10)
  }
};
```

## Built-in validations

React Formation includes several built-in validations from [chriso's validator.js](http://github.com/chriso/validator.js), including `url`, `email`, `alpha`, `creditCard`, `number`, `min`, `max`, `date`, `before`, `after`, `minLength`, `maxLength`, `oneOf`, `pattern`, `currency`, and `hexColor`.

All built in validations are functions and can be called like this:

```jsx
Validator.creditCard();
```

As a short form, you can specify them in a schema with a string:

```jsx
email: {
  type: 'creditCard' // this is equivalent to Validator.creditCard();
}
```

Some validations take arguments, such as the `min`, `max`, and `oneOf` validations:

```jsx
Validator.min(0);
Validator.max(100);
Validator.oneOf(['foo', 'bar', 'baz'])
```

You can also chain multiple validations together like this:

```jsx
Validator.number().creditCard();
```

## Customization

### Error messages

Each built-in validation in React Formation ships with an error message. If you would like to override it, you can do so at the global level:

```jsx
var Validator = require('react-formation').Validator;

Validator.messages.creditCard = 'NO FOOLING'

// Now any invalid fields with this validation
// will return NO FOOLING as the error message
```

or at the instance level:

```jsx
var Validator = require('react-formation').Validator;

var v = Validator().creditCard();
v.messages.creditCard = 'NO FOOLING'

// Now only fields validated with this instance
// will use NO FOOLING as the error message
```

### Validations

The simplest way to create a custom validation is to pass a function to the `type` property instead of a `Validator` object.

Make sure the function returns `false` if the input is valid, or else an error string if it is invalid.

```jsx
function isBob(value) {
  if (value === 'Bob') {
    return false;
  } else {
    return 'Your name is not Bob.'
  }
}

var schema = {
  name: {type: isBob}
};
```

Custom validation functions are called with the **Formation instance context**, so you can access other properties and methods with `this`:

```jsx
function sameAsPassword(value) {
  if (value === this.linkField('password').value) {
    return false;
  } else {
    return 'Not the same as your password.'
  }
}

var schema = {
  password: {required: true},
  name: {type: sameAsPassword}
};
```

Below is a table of what to expect from each form validation:

Validation | Valid | Invalid | Description
-----------|-------|---------|-------------
`email`|'foo@bar.com', 'test123@m端ller.com', 'gmail...ignores...dots...@gmail.com'|'foo@bar.com.', 'z@co.c', '@invalid.com'|Checks if valid email
`url`|'http://www.foobar.com/','http://189.123.14.13/','http://foo--bar.com'|'http://www.xn--.com/','http://lol @foobar.com/'|Check if valid URL
`date`|'2011-08-04','04. 08. 2011.','08/04/2011','January 9, 2013'|'foo','2011-foo-04','GMT'|Check if valid date
`before`| | |Check if date is before
`after`| | |Check if date is after
`number`|'8', '2012'|'j32h', 'j'|Checks if valid number
`alpha`| | |Check if string is only letters
`max`| | |Check if number is below a given max
`min`| | |Check if number is above a given min
`maxLength`| | |Check if string length is below a given max
`minLength`| | |Check if strin length is above a given min
`creditCard`| | |Check is credit card number is valid
`oneOf`| | |Check if string matches a given string
`pattern`| | |Check if string matches
`currency`| | |Check if valid currency value
`hexColor`| | |Check if valid hexadecimal color value

