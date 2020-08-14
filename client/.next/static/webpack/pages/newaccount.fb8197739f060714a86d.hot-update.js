webpackHotUpdate_N_E("pages/newaccount",{

/***/ "./pages/newaccount.js":
/*!*****************************!*\
  !*** ./pages/newaccount.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! yup */ "./node_modules/yup/es/index.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/index.js");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.js");
var _jsxFileName = "C:\\Users\\angel\\Documents\\React\\GraphQL\\CRM\\client\\pages\\newaccount.js",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const NEW_ACCOUNT = _apollo_client__WEBPACK_IMPORTED_MODULE_3__["gql"]`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastName
      age
      email
    }
  }
`;

function NewAccount() {
  _s();

  //New Account Mutation
  const [newUser] = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_3__["useMutation"])(NEW_ACCOUNT); //Form Validations

  const formik = Object(formik__WEBPACK_IMPORTED_MODULE_1__["useFormik"])({
    initialValues: {
      name: '',
      lastname: '',
      age: null,
      email: '',
      password: ''
    },
    validationSchema: yup__WEBPACK_IMPORTED_MODULE_2__["object"]({
      name: yup__WEBPACK_IMPORTED_MODULE_2__["string"]().required('Add a name'),
      lastname: yup__WEBPACK_IMPORTED_MODULE_2__["string"]().required('Add a lastname'),
      age: yup__WEBPACK_IMPORTED_MODULE_2__["number"]().required('Add a age'),
      email: yup__WEBPACK_IMPORTED_MODULE_2__["string"]().email('Invalid email').required('Add a email'),
      password: yup__WEBPACK_IMPORTED_MODULE_2__["string"]().required('Add a password').min(6, 'The password must be at least of 6 characters')
    }),
    onSubmit: async values => {
      console.log('SUBMITING');
      console.log(values);
      const {
        name,
        lastname,
        age,
        email,
        password
      } = values;

      try {
        await newUser({
          variables: {
            input: {
              name,
              lastname,
              email,
              age,
              password
            }
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  const errorName = formik.touched.name && formik.errors.name && __jsx("div", {
    className: "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 5
    }
  }, __jsx("p", {
    className: "font-bold",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }
  }, formik.errors.name));

  const errorLastname = formik.touched.lastname && formik.errors.lastname && __jsx("div", {
    className: "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 5
    }
  }, __jsx("p", {
    className: "font-bold",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 7
    }
  }, formik.errors.lastname));

  const errorAge = formik.touched.age && formik.errors.age && __jsx("div", {
    className: "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 5
    }
  }, __jsx("p", {
    className: "font-bold",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 7
    }
  }, formik.errors.age));

  const errorEmail = formik.touched.email && formik.errors.email && __jsx("div", {
    className: "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 5
    }
  }, __jsx("p", {
    className: "font-bold",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 7
    }
  }, formik.errors.email));

  const errorPassword = formik.touched.password && formik.errors.password && __jsx("div", {
    className: "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 5
    }
  }, __jsx("p", {
    className: "font-bold",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }
  }, formik.errors.password));

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 7
    }
  }, __jsx("h1", {
    className: "text-center text-2xl text-white font-light",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 9
    }
  }, "New Account"), __jsx("div", {
    className: "flex justify-center mt-5",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "w-full max-w-sm",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 11
    }
  }, __jsx("form", {
    className: "bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4",
    onSubmit: formik.handleSubmit,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "mb-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 15
    }
  }, __jsx("label", {
    className: "block text-green-700 text-sm font-bold mb-2",
    htmlFor: "name",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 17
    }
  }, "Name"), __jsx("input", {
    className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    id: "name",
    type: "text",
    placeholder: "Name",
    value: formik.values.name,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 17
    }
  })), errorName, __jsx("div", {
    className: "mb-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 15
    }
  }, __jsx("label", {
    className: "block text-green-700 text-sm font-bold mb-2",
    htmlFor: "lastname",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 17
    }
  }, "Last Name"), __jsx("input", {
    className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    id: "lastname",
    type: "text",
    placeholder: "Last Name",
    value: formik.values.lastname,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 17
    }
  })), errorLastname, __jsx("div", {
    className: "mb-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 15
    }
  }, __jsx("label", {
    className: "block text-green-700 text-sm font-bold mb-2",
    htmlFor: "age",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 17
    }
  }, "Age"), __jsx("input", {
    className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    id: "age",
    type: "number",
    placeholder: "Age",
    value: formik.values.age,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 17
    }
  })), errorAge, __jsx("div", {
    className: "mb-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 168,
      columnNumber: 15
    }
  }, __jsx("label", {
    className: "block text-green-700 text-sm font-bold mb-2",
    htmlFor: "email",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 169,
      columnNumber: 17
    }
  }, "Email"), __jsx("input", {
    className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    id: "email",
    type: "email",
    placeholder: "User Email",
    value: formik.values.email,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 17
    }
  })), errorEmail, __jsx("div", {
    className: "mb-4",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 15
    }
  }, __jsx("label", {
    className: "block text-green-700 text-sm font-bold mb-2",
    htmlFor: "password",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 17
    }
  }, "Password"), __jsx("input", {
    className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    id: "password",
    type: "password",
    placeholder: "Password",
    value: formik.values.password,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 17
    }
  })), errorPassword, __jsx("input", {
    className: "bg-green-800 w-full mt-5 p-2 text-white uppercase hover:bg-green-900",
    type: "submit",
    value: "Create Account",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 15
    }
  }))))));
}

_s(NewAccount, "/Om3mawDar8SsiGBgLSjaXLC9og=", false, function () {
  return [_apollo_client__WEBPACK_IMPORTED_MODULE_3__["useMutation"], formik__WEBPACK_IMPORTED_MODULE_1__["useFormik"]];
});

_c = NewAccount;
/* harmony default export */ __webpack_exports__["default"] = (NewAccount);

var _c;

$RefreshReg$(_c, "NewAccount");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbmV3YWNjb3VudC5qcyJdLCJuYW1lcyI6WyJORVdfQUNDT1VOVCIsImdxbCIsIk5ld0FjY291bnQiLCJuZXdVc2VyIiwidXNlTXV0YXRpb24iLCJmb3JtaWsiLCJ1c2VGb3JtaWsiLCJpbml0aWFsVmFsdWVzIiwibmFtZSIsImxhc3RuYW1lIiwiYWdlIiwiZW1haWwiLCJwYXNzd29yZCIsInZhbGlkYXRpb25TY2hlbWEiLCJZdXAiLCJyZXF1aXJlZCIsIm1pbiIsIm9uU3VibWl0IiwidmFsdWVzIiwiY29uc29sZSIsImxvZyIsInZhcmlhYmxlcyIsImlucHV0IiwiZXJyIiwiZXJyb3IiLCJlcnJvck5hbWUiLCJ0b3VjaGVkIiwiZXJyb3JzIiwiZXJyb3JMYXN0bmFtZSIsImVycm9yQWdlIiwiZXJyb3JFbWFpbCIsImVycm9yUGFzc3dvcmQiLCJoYW5kbGVTdWJtaXQiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVCbHVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUEsTUFBTUEsV0FBVyxHQUFHQyxrREFBSTs7Ozs7Ozs7OztDQUF4Qjs7QUFZQSxTQUFTQyxVQUFULEdBQXNCO0FBQUE7O0FBRXBCO0FBQ0EsUUFBTSxDQUFDQyxPQUFELElBQVlDLGtFQUFXLENBQUNKLFdBQUQsQ0FBN0IsQ0FIb0IsQ0FLcEI7O0FBQ0EsUUFBTUssTUFBTSxHQUFHQyx3REFBUyxDQUFDO0FBQ3ZCQyxpQkFBYSxFQUFFO0FBQ2JDLFVBQUksRUFBRSxFQURPO0FBRWJDLGNBQVEsRUFBRSxFQUZHO0FBR2JDLFNBQUcsRUFBRSxJQUhRO0FBSWJDLFdBQUssRUFBRSxFQUpNO0FBS2JDLGNBQVEsRUFBRTtBQUxHLEtBRFE7QUFRdkJDLG9CQUFnQixFQUFFQywwQ0FBQSxDQUFXO0FBQzNCTixVQUFJLEVBQUVNLDBDQUFBLEdBQWFDLFFBQWIsQ0FBc0IsWUFBdEIsQ0FEcUI7QUFF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TEYsQ0FERixDQURGO0FBNEhEOztHQXZNUTdCLFU7VUFHV0UsMEQsRUFHSEUsZ0Q7OztLQU5SSixVO0FBeU1NQSx5RUFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9uZXdhY2NvdW50LmZiODE5NzczOWYwNjA3MTRhODZkLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VGb3JtaWsgfSBmcm9tICdmb3JtaWsnO1xyXG5pbXBvcnQgKiBhcyBZdXAgZnJvbSAneXVwJztcclxuaW1wb3J0IHsgdXNlTXV0YXRpb24sIGdxbCB9IGZyb20gJ0BhcG9sbG8vY2xpZW50JztcclxuXHJcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9MYXlvdXQnO1xyXG5cclxuY29uc3QgTkVXX0FDQ09VTlQgPSBncWxgXHJcbiAgbXV0YXRpb24gbmV3VXNlcigkaW5wdXQ6IFVzZXJJbnB1dCkge1xyXG4gICAgbmV3VXNlcihpbnB1dDogJGlucHV0KSB7XHJcbiAgICAgIGlkXHJcbiAgICAgIG5hbWVcclxuICAgICAgbGFzdE5hbWVcclxuICAgICAgYWdlXHJcbiAgICAgIGVtYWlsXHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG5cclxuZnVuY3Rpb24gTmV3QWNjb3VudCgpIHtcclxuXHJcbiAgLy9OZXcgQWNjb3VudCBNdXRhdGlvblxyXG4gIGNvbnN0IFtuZXdVc2VyXSA9IHVzZU11dGF0aW9uKE5FV19BQ0NPVU5UKTtcclxuXHJcbiAgLy9Gb3JtIFZhbGlkYXRpb25zXHJcbiAgY29uc3QgZm9ybWlrID0gdXNlRm9ybWlrKHtcclxuICAgIGluaXRpYWxWYWx1ZXM6IHtcclxuICAgICAgbmFtZTogJycsXHJcbiAgICAgIGxhc3RuYW1lOiAnJyxcclxuICAgICAgYWdlOiBudWxsLFxyXG4gICAgICBlbWFpbDogJycsXHJcbiAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgIH0sXHJcbiAgICB2YWxpZGF0aW9uU2NoZW1hOiBZdXAub2JqZWN0KHtcclxuICAgICAgbmFtZTogWXVwLnN0cmluZygpLnJlcXVpcmVkKCdBZGQgYSBuYW1lJyksXHJcbiAgICAgIGxhc3RuYW1lOiBZdXAuc3RyaW5nKCkucmVxdWlyZWQoJ0FkZCBhIGxhc3RuYW1lJyksXHJcbiAgICAgIGFnZTogWXVwLm51bWJlcigpLnJlcXVpcmVkKCdBZGQgYSBhZ2UnKSxcclxuICAgICAgZW1haWw6IFl1cC5zdHJpbmcoKS5lbWFpbCgnSW52YWxpZCBlbWFpbCcpLnJlcXVpcmVkKCdBZGQgYSBlbWFpbCcpLFxyXG4gICAgICBwYXNzd29yZDogWXVwLnN0cmluZygpLnJlcXVpcmVkKCdBZGQgYSBwYXNzd29yZCcpLm1pbig2LCAnVGhlIHBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3Qgb2YgNiBjaGFyYWN0ZXJzJyksXHJcbiAgICB9KSxcclxuICAgIG9uU3VibWl0OiBhc3luYyB2YWx1ZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnU1VCTUlUSU5HJyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7XHJcblxyXG4gICAgICBjb25zdCB7IG5hbWUsIGxhc3RuYW1lLCBhZ2UsIGVtYWlsLCBwYXNzd29yZCB9ID0gdmFsdWVzO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBuZXdVc2VyKHtcclxuICAgICAgICAgIHZhcmlhYmxlczoge1xyXG4gICAgICAgICAgICBpbnB1dDoge1xyXG4gICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgbGFzdG5hbWUsXHJcbiAgICAgICAgICAgICAgZW1haWwsXHJcbiAgICAgICAgICAgICAgYWdlLFxyXG4gICAgICAgICAgICAgIHBhc3N3b3JkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGVycm9yTmFtZSA9IGZvcm1pay50b3VjaGVkLm5hbWUgJiYgZm9ybWlrLmVycm9ycy5uYW1lICYmIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXktMiBiZy1yZWQtMTAwIGJvcmRlci1sLTQgYm9yZGVyLXJlZC01MDAgdGV4dC1yZWQtNzAwIHAtNFwiPlxyXG4gICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGRcIj57Zm9ybWlrLmVycm9ycy5uYW1lfTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGVycm9yTGFzdG5hbWUgPSBmb3JtaWsudG91Y2hlZC5sYXN0bmFtZSAmJiBmb3JtaWsuZXJyb3JzLmxhc3RuYW1lICYmIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXktMiBiZy1yZWQtMTAwIGJvcmRlci1sLTQgYm9yZGVyLXJlZC01MDAgdGV4dC1yZWQtNzAwIHAtNFwiPlxyXG4gICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGRcIj57Zm9ybWlrLmVycm9ycy5sYXN0bmFtZX08L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG5cclxuICBjb25zdCBlcnJvckFnZSA9IGZvcm1pay50b3VjaGVkLmFnZSAmJiBmb3JtaWsuZXJyb3JzLmFnZSAmJiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTIgYmctcmVkLTEwMCBib3JkZXItbC00IGJvcmRlci1yZWQtNTAwIHRleHQtcmVkLTcwMCBwLTRcIj5cclxuICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+e2Zvcm1pay5lcnJvcnMuYWdlfTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGVycm9yRW1haWwgPSBmb3JtaWsudG91Y2hlZC5lbWFpbCAmJiBmb3JtaWsuZXJyb3JzLmVtYWlsICYmIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXktMiBiZy1yZWQtMTAwIGJvcmRlci1sLTQgYm9yZGVyLXJlZC01MDAgdGV4dC1yZWQtNzAwIHAtNFwiPlxyXG4gICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGRcIj57Zm9ybWlrLmVycm9ycy5lbWFpbH08L3A+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG5cclxuICBjb25zdCBlcnJvclBhc3N3b3JkID0gZm9ybWlrLnRvdWNoZWQucGFzc3dvcmQgJiYgZm9ybWlrLmVycm9ycy5wYXNzd29yZCAmJiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTIgYmctcmVkLTEwMCBib3JkZXItbC00IGJvcmRlci1yZWQtNTAwIHRleHQtcmVkLTcwMCBwLTRcIj5cclxuICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+e2Zvcm1pay5lcnJvcnMucGFzc3dvcmR9PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxMYXlvdXQ+XHJcbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtMnhsIHRleHQtd2hpdGUgZm9udC1saWdodFwiPlxyXG4gICAgICAgICAgTmV3IEFjY291bnRcclxuICAgICAgICA8L2gxPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgbXQtNVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc21cIj5cclxuICAgICAgICAgICAgPGZvcm1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkIHNoYWRvdy1tZCBweC04IHB0LTYgcGItOCBtYi00XCJcclxuICAgICAgICAgICAgICBvblN1Ym1pdD17Zm9ybWlrLmhhbmRsZVN1Ym1pdH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtZ3JlZW4tNzAwIHRleHQtc20gZm9udC1ib2xkIG1iLTJcIlxyXG4gICAgICAgICAgICAgICAgICBodG1sRm9yPVwibmFtZVwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIE5hbWVcclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2hhZG93IGFwcGVhcmFuY2Utbm9uZSBib3JkZXIgcm91bmRlZCB3LWZ1bGwgcHktMiBweC0zIHRleHQtZ3JheS03MDAgbGVhZGluZy10aWdodCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6c2hhZG93LW91dGxpbmVcIlxyXG4gICAgICAgICAgICAgICAgICBpZD1cIm5hbWVcIlxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtaWsudmFsdWVzLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtmb3JtaWsuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICBvbkJsdXI9e2Zvcm1pay5oYW5kbGVCbHVyfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAge2Vycm9yTmFtZX1cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00XCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWxcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1ncmVlbi03MDAgdGV4dC1zbSBmb250LWJvbGQgbWItMlwiXHJcbiAgICAgICAgICAgICAgICAgIGh0bWxGb3I9XCJsYXN0bmFtZVwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIExhc3QgTmFtZVxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzaGFkb3cgYXBwZWFyYW5jZS1ub25lIGJvcmRlciByb3VuZGVkIHctZnVsbCBweS0yIHB4LTMgdGV4dC1ncmF5LTcwMCBsZWFkaW5nLXRpZ2h0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpzaGFkb3ctb3V0bGluZVwiXHJcbiAgICAgICAgICAgICAgICAgIGlkPVwibGFzdG5hbWVcIlxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCJcclxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1pay52YWx1ZXMubGFzdG5hbWV9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtmb3JtaWsuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICBvbkJsdXI9e2Zvcm1pay5oYW5kbGVCbHVyfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAge2Vycm9yTGFzdG5hbWV9XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtZ3JlZW4tNzAwIHRleHQtc20gZm9udC1ib2xkIG1iLTJcIlxyXG4gICAgICAgICAgICAgICAgICBodG1sRm9yPVwiYWdlXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgQWdlXHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNoYWRvdyBhcHBlYXJhbmNlLW5vbmUgYm9yZGVyIHJvdW5kZWQgdy1mdWxsIHB5LTIgcHgtMyB0ZXh0LWdyYXktNzAwIGxlYWRpbmctdGlnaHQgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnNoYWRvdy1vdXRsaW5lXCJcclxuICAgICAgICAgICAgICAgICAgaWQ9XCJhZ2VcIlxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBZ2VcIlxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybWlrLnZhbHVlcy5hZ2V9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtmb3JtaWsuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICBvbkJsdXI9e2Zvcm1pay5oYW5kbGVCbHVyfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAge2Vycm9yQWdlfVxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTRcIj5cclxuICAgICAgICAgICAgICAgIDxsYWJlbFxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJibG9jayB0ZXh0LWdyZWVuLTcwMCB0ZXh0LXNtIGZvbnQtYm9sZCBtYi0yXCJcclxuICAgICAgICAgICAgICAgICAgaHRtbEZvcj1cImVtYWlsXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgRW1haWxcclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2hhZG93IGFwcGVhcmFuY2Utbm9uZSBib3JkZXIgcm91bmRlZCB3LWZ1bGwgcHktMiBweC0zIHRleHQtZ3JheS03MDAgbGVhZGluZy10aWdodCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6c2hhZG93LW91dGxpbmVcIlxyXG4gICAgICAgICAgICAgICAgICBpZD1cImVtYWlsXCJcclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJVc2VyIEVtYWlsXCJcclxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1pay52YWx1ZXMuZW1haWx9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtmb3JtaWsuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICBvbkJsdXI9e2Zvcm1pay5oYW5kbGVCbHVyfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAge2Vycm9yRW1haWx9XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtZ3JlZW4tNzAwIHRleHQtc20gZm9udC1ib2xkIG1iLTJcIlxyXG4gICAgICAgICAgICAgICAgICBodG1sRm9yPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICBQYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzaGFkb3cgYXBwZWFyYW5jZS1ub25lIGJvcmRlciByb3VuZGVkIHctZnVsbCBweS0yIHB4LTMgdGV4dC1ncmF5LTcwMCBsZWFkaW5nLXRpZ2h0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpzaGFkb3ctb3V0bGluZVwiXHJcbiAgICAgICAgICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1pay52YWx1ZXMucGFzc3dvcmR9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtmb3JtaWsuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICBvbkJsdXI9e2Zvcm1pay5oYW5kbGVCbHVyfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAge2Vycm9yUGFzc3dvcmR9XHJcblxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZ3JlZW4tODAwIHctZnVsbCBtdC01IHAtMiB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBob3ZlcjpiZy1ncmVlbi05MDBcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT1cIkNyZWF0ZSBBY2NvdW50XCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9MYXlvdXQ+XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXdBY2NvdW50OyJdLCJzb3VyY2VSb290IjoiIn0=