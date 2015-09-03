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
`before`|'2010-07-02', '2010-08-04', new Date(0)|'08/04/2011', new Date(2011, 9, 10)|Check if date is before
`after`|'2011-08-04', new Date(2011, 8, 10)|'2010-07-02', '2011-08-03', new Date(0)|Check if date is after
`number`|'8', '2012'|'j32h', 'j'|Checks if valid number
`alpha`|'abc', 'ABC', 'FooBar'|'f o', 'foo1', ''|Check if string is only letters
`max`|'5'|'42'|Check if number is below a given max
`min`|'20'|'1|Check if number is above a given min
`maxLength`|'cat'|'elephant'|Check if string length is below a given max
`minLength`|'elephant'|'cat'|Check if strin length is above a given min
`creditCard`|'4716461583322103', '4716-2210-5188-5662', '4929 7226 5379 7141'|'5398228707871528', 'foo'|Check is credit card number is valid
`oneOf`|'foo', 'bar'|'baz'|Check if string matches a given string
`pattern`|'foo'|'bar'|Check if string matches
`currency`|'42.42', '2897.99', '2829873'|'42..42', '..38', '32.3'|Check if valid currency value
`hexColor`|'1f1f1F'|'030k93l'|Check if valid hexadecimal color value


### Validator helper: what to expect

### `email`

**valid:** 'foo@bar.com', 'test123@m端ller.com', 'gmail...ignores...dots...@gmail.com'

**invalid:** 'foo@bar.com.', 'z@co.c', '@invalid.com'

**Description:** Checks if valid email


### `url`

**Valid:** 'http://www.foobar.com/', 'http://189.123.14.13/', 'http://foo--bar.com'

**Invalid:** 'http://www.xn--.com/', 'http://lol @foobar.com/'

**Description:** Check if valid date


### `date`

**Valid:** '2011-08-04', '04. 08. 2011.', '08/04/2011', 'January 9, 2013'

**Invalid:** 'foo', '2011-foo-04', 'GMT'

**Description:** Check if valid date


### `before`

*Where date argument is '08/04/2011'*

**Valid:** '2010-07-02', '2010-08-04', new Date(0)

**Invalid:** '08/04/2011', new Date(2011, 9, 10)

**Description:** Check if date is before given date


### `after`

*Where date argument is '2011-08-03'*

**Valid:** '2011-08-04', new Date(2011, 8, 10)

**Invalid:** '2010-07-02', '2011-08-03', new Date(0)

**Description:** Check if date is after given date


### `number`

**Valid:** '8', '2012'

**Invalid:** '32h', 'j'

**Description:** Checks if valid number


### `alpha`

**Valid:** 'abc', 'ABC', 'FooBar'

**Invalid:** 'f o', 'foo1', ''

**Description:** Check if date is before


### `max`

*Where number argument is 8*

**Valid:** '5'

**Invalid:** '42'

**Description:** Check if number is below a given max


### `min`

*Where number argument is 8*

**Valid:** '20'

**Invalid:** '1'

**Description:** Check if number is above a given min


### `maxLength`

*Where argument is 5*

**Valid:** 'cat'

**Invalid:** 'elephant'

**Description:** Check if string length is below a given max


### `minLength`

*Where argument is 5*

**Valid:** 'elephant'

**Invalid:** 'cat'

**Description:** Check if string length is above a given min


### `creditCard`

**Valid:** '4716461583322103', '4716-2210-5188-5662', '4929 7226 5379 7141'

**Invalid:** '5398228707871528', 'foo'

**Description:** Check is credit card number is valid


### `oneOf`

*Where given argument is ['foo', 'bar']*

**Valid:** 'foo', 'bar'

**Invalid:** 'baz'

**Description:** Check if string matches given array of strings


### `pattern`

Where given argument is '/foo/'

**Valid:** 'foo'

**Invalid:** 'bar'

**Description:** Check if string matches


### `currency`

**Valid:** '42.42', '2897.99', '2829873'

**Invalid:** '42..42', '..38', '32.3'

**Description:** Check if valid currency value


### `hexColor`

**Valid:** '1f1f1F'

**Invalid:** '030k93l'

**Description:** Check if valid hexadecimal color value