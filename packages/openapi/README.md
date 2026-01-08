# @formkit-gov/openapi

Generate Zod schemas and TypeScript types from OpenAPI specifications for schema federation.

## Status

**Coming in v0.5.0** - This package is currently a placeholder.

See the [roadmap](../../docs/ROADMAP.md) for planned features.

## Planned Features

- OpenAPI 3.0 parser
- OpenAPI 3.1 parser
- Zod schema generator
- TypeScript type generator
- CLI implementation (`formkit-openapi`)
- Watch mode
- Schema validation command
- Custom schema extensions
- Reference (`$ref`) resolution
- Circular reference handling

## Installation

```bash
pnpm add @formkit-gov/openapi
```

## CLI Usage (Planned)

```bash
# Generate Zod schemas from OpenAPI spec
npx formkit-openapi generate ./openapi.yaml -o ./src/schemas

# Watch mode
npx formkit-openapi generate ./openapi.yaml -o ./src/schemas --watch

# Validate schemas
npx formkit-openapi validate ./openapi.yaml
```

## Documentation

Full documentation will be available at
[docs.formkit-gov.org/openapi](https://docs.formkit-gov.org/openapi) when this package is released.

## License

MIT
