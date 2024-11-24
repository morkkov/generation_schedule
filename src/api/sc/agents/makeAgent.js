import { ScAddr, ScConstruction, ScEventParams, ScEventType, ScTemplate, ScType } from 'ts-sc-client';
import { client } from '../client';

const question = 'question';
const questionInitiated = 'question_initiated';
const answer = 'nrel_answer';
const questionFinished = 'question_finished';

const baseKeynodes = [
    { id: question, type: ScType.NodeConstClass },
    { id: questionInitiated, type: ScType.NodeConstClass },
    { id: answer, type: ScType.NodeConstNoRole },
    { id: questionFinished, type: ScType.NodeConstClass },
];

const describeAgent = async (template, actionNodeAlias) => {
    const generationResult = await client.templateGenerate(template, {});

    if (generationResult && generationResult.size > 0) {
        return generationResult.get(actionNodeAlias);
    }
    return null;
};

const findResultCircuit = async (actionNode, keynodes) => {
    const circuitDialogAlias = '_circuit_dialog';
    const template = new ScTemplate();

    template.tripleWithRelation(
        actionNode,
        ScType.EdgeDCommonVar,
        [ScType.NodeVarStruct, circuitDialogAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[answer],
    );
    const result = await client.templateSearch(template);

    if (result.length) {
        return result[0].get(circuitDialogAlias);
    }
    return null;
};

const subscribeToAgentAnswer = async (actionNode, keynodes, onResponse) => {
    const onActionFinished = (_subscibedAddr, _arc, anotherAddr, eventId) => {
        if (anotherAddr.isValid() && anotherAddr.equal(keynodes[questionFinished])) {
            client.eventsDestroy(eventId);
            onResponse();
        }
    };

    const eventParams = new ScEventParams(actionNode, ScEventType.AddIngoingEdge, onActionFinished);

    client.eventsCreate(eventParams);
};

export const makeAgent = (template, actionNodeAlias) => {
    return new Promise((resolve) => {
        client.resolveKeynodes(baseKeynodes).then(async (keynodes) => {
            const actionNode = await describeAgent(template, actionNodeAlias);
            if (!actionNode) return resolve(null);

            const onResponse = async () => {
                resolve(await findResultCircuit(actionNode, keynodes));
            };
            await subscribeToAgentAnswer(actionNode, keynodes, onResponse);
            const construction = new ScConstruction();
            construction.createEdge(ScType.EdgeAccessConstPosPerm, keynodes[questionInitiated], actionNode);
            client.createElements(construction);
        });
    });
};
