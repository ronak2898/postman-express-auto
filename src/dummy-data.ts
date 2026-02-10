import { faker } from '@faker-js/faker';

export class DummyDataGenerator {
  generateUserData(): any {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode()
      }
    };
  }

  generatePostData(): any {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      published: faker.datatype.boolean()
    };
  }

  generateProductData(): any {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      inStock: faker.datatype.boolean()
    };
  }

  generateCommentData(): any {
    return {
      text: faker.lorem.paragraph(),
      author: faker.person.fullName(),
      createdAt: faker.date.recent().toISOString()
    };
  }

  generateGenericData(): any {
    return {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      value: faker.number.int({ min: 1, max: 100 })
    };
  }

  generateFromSchema(schema: any): any {
    if (!schema || !schema.properties) {
      return this.generateGenericData();
    }

    const result: any = {};
    
    for (const [key, prop] of Object.entries(schema.properties as Record<string, any>)) {
      result[key] = this.generateValue(key, prop.type, prop.format);
    }
    
    return result;
  }

  private generateValue(fieldName: string, type: string, format?: string): any {
    const lowerName = fieldName.toLowerCase();

    // Smart generation based on field name
    if (lowerName.includes('email')) return faker.internet.email();
    if (lowerName.includes('firstname')) return faker.person.firstName();
    if (lowerName.includes('lastname')) return faker.person.lastName();
    if (lowerName.includes('name')) return faker.person.fullName();
    if (lowerName.includes('date') || lowerName.includes('createdat')) {
      return faker.date.recent().toISOString();
    }
    if (lowerName.includes('id') || lowerName.includes('uuid')) {
      return faker.string.uuid();
    }
    if (lowerName.includes('address')) return faker.location.streetAddress();
    if (lowerName.includes('city')) return faker.location.city();
    if (lowerName.includes('country')) return faker.location.country();
    if (lowerName.includes('phone')) return faker.phone.number();
    if (lowerName.includes('url')) return faker.internet.url();
    if (lowerName.includes('price') || lowerName.includes('amount')) {
      return parseFloat(faker.commerce.price());
    }

    // Fallback to type
    switch (type) {
      case 'string': return faker.lorem.word();
      case 'number':
      case 'integer': return faker.number.int({ min: 1, max: 100 });
      case 'boolean': return faker.datatype.boolean();
      case 'array': return [];
      default: return null;
    }
  }
}
