import { AssistantOutput } from '@/common/providers/assistant/IAssistant';

export class generateInitialMessage {
  private ACTIONS_LABELS = {
    generateButtons: 'generateButtons',
  };
  private RESPONSE_TYPES = {
    text: 'text',
  };
  generateInitialMessage(
    initialText?: string
  ): {
    output?: AssistantOutput;
    context: Record<string, unknown>;
  } {
    const context: Record<string, unknown> = {};
    if (process.env.LANDINGPAGE_HAS_INITIAL_BUTTONS) {
      context.action = this.ACTIONS_LABELS.generateButtons;
      context.buttonLabels = process.env.LANDINGPAGE_INITIAL_BUTTONS;
    }
    return {
      context,
      output: {
        generic: [
          {
            response_type: this.RESPONSE_TYPES.text,
            text: initialText ?? process.env.LANDINGPAGE_INTIAL_MESSAGE,
          },
        ],
      },
    };
  }
}
