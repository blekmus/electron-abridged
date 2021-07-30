const fs = require('fs-extra')

async function example() {
  try {
    await fs.copy('/tmp/some/mydir', '/tmp/some')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

example()
