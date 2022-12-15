# Test Scopes

- `api-sdk`
   - executes the SDK client and asserts on the result
   - mocks AWS API
- `api-test`
   - executes the SDK client and asserts on the result
   - uses the real AWS services
- `web`
   - executes the component render methods and asserts on the rendered
     components
   - mocks Scroll SDK
   - mocks DOM (every DOM component is mocked; every component in `web` is real)
- end to end
   - should this be automated?
   - executes the UI, asserts on what's displayed in the UI
   - mocks nothing

