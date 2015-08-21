var React = require('react');
var CreateForm = require('../../src/form.jsx').CreateForm;

var Form = CreateForm({

  // This defines all the fields in the form
  schema: {
    name: {
      label: 'Name',
      type: 'string'
    },
    email: {
      label: 'Email',
      type: 'string'
    }
  },

  // This code is run when the form is valid and submitted
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {
    return (<form>

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" valueLink={this.linkField('name')} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="text" name="email" valueLink={this.linkField('email')} />
      </div>

      <p><button onClick={this.submitForm}>Submit</button></p>

    </form>);
  }
});

module.exports = Form;
