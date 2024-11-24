import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserSchema } from './User';

@modelOptions({
	schemaOptions: {
		toJSON: {
			transform: (_document, returnedObject) => {
				returnedObject.id = returnedObject._id;
				delete returnedObject._id;
				delete returnedObject.__v;
			},
		},
	},
})
export class TodoSchema {

	@prop({ type: String, required: true })
	text: string;
	
	@prop({ type: Boolean, default: false })
	completed: boolean;

	@prop({ ref: () => UserSchema })
	userId: Ref<UserSchema>;
}

export const TodoModel = getModelForClass(TodoSchema);